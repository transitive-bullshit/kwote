import * as React from 'react'
import cs from 'clsx'
import shallow from 'zustand/shallow'
import { toPng, toJpeg, toSvg, toBlob } from 'html-to-image'
import { toast } from 'react-hot-toast'
import { Select } from '@chakra-ui/react'
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Divider,
  Button,
  Portal,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Input,
  Switch,
  Tooltip
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'

import { Paper } from '~/components/Paper/Paper'
import { useEditorStore } from '~/lib/editor-store'
import { MIN_FRAME_WIDTH, MAX_FRAME_WIDTH, isSafari } from '~/lib/config'
import {
  backgroundImageOptions,
  backgroundImageOptionsMapById,
  backgroundImageOptionsMapBySrc
} from '~/lib/background-images'

import styles from './styles.module.css'

const fontFamilies = [
  'Inter',
  'Roboto',
  'Open Sans',
  'Lato',
  'Montserrat',
  'Oswald',
  'Source Sans Pro',
  'Raleway',
  'Merriweather',
  'Noto Sans',
  'Noto Sans Japanese',
  'Noto Sans Korean',
  'Noto Sans Traditional Chinese',
  'Nunito',
  'Nunito Sans',
  'Prompt',
  'Poppins',
  'Ubuntu',
  'Quicksand',
  'Noto Serif',
  'Source Code Pro',
  'PT Sans',
  'Work Sans',
  'Mukta'
].sort()

const filename = 'kwote'

export const ControlPanel: React.FC<{ className?: string }> = ({
  className
}) => {
  const { config, updateConfig, editorRef, currentWidth, currentHeight } =
    useEditorStore(
      (store) => ({
        config: store.config,
        updateConfig: store.updateConfig,
        editorRef: store.editorRef,
        currentWidth: store.currentWidth,
        currentHeight: store.currentHeight
      }),
      shallow
    )

  const safariWorkaroundHack = React.useCallback(async () => {
    if (!isSafari) return
    if (!editorRef) return

    // For some reason, the first few times an image is referenced in safari,
    // it will sometimes render blank. This should fix this issue mostly...
    // @see https://github.com/bubkoo/html-to-image/issues/199
    await toPng(editorRef)
    await toPng(editorRef)
    await toPng(editorRef)
  }, [editorRef])

  const onClickSaveToPNG = React.useCallback(async () => {
    if (!editorRef) return
    await safariWorkaroundHack()

    toPng(editorRef)
      .then((dataUrl: string) => {
        const link = document.createElement('a')
        link.download = `${filename}.png`
        link.href = dataUrl
        link.click()
        toast.success('Saved png image')
      })
      .catch((err: Error) => {
        console.error(err)
        toast.error('Error exporting image. Check the console for details')
      })
  }, [editorRef, safariWorkaroundHack])

  const onClickSaveToJPEG = React.useCallback(async () => {
    if (!editorRef) return
    await safariWorkaroundHack()

    toJpeg(editorRef, { quality: 0.9 })
      .then((dataUrl: string) => {
        const link = document.createElement('a')
        link.download = `${filename}.jpg`
        link.href = dataUrl
        link.click()
        toast.success('Saved jpeg image')
      })
      .catch((err: Error) => {
        console.error(err)
        toast.error('Error exporting image. Check the console for details')
      })
  }, [editorRef, safariWorkaroundHack])

  const onClickSaveToSVG = React.useCallback(async () => {
    if (!editorRef) return
    await safariWorkaroundHack()

    toSvg(editorRef)
      .then((dataUrl: string) => {
        const link = document.createElement('a')
        link.download = `${filename}.svg`
        link.href = dataUrl
        link.click()
        toast.success('Saved svg image')
      })
      .catch((err: Error) => {
        console.error(err)
        toast.error('Error exporting image. Check the console for details')
      })
  }, [editorRef, safariWorkaroundHack])

  const onClickCopyAsPNG = React.useCallback(async () => {
    if (!editorRef) return
    await safariWorkaroundHack()

    toBlob(editorRef)
      .then((blob: Blob | null) => {
        if (!blob) {
          console.error('unknown error occurred exporting image')
          toast.error('Error exporting image. Check the console for details')
          return
        }

        const item = new ClipboardItem({ 'image/png': blob })
        navigator.clipboard
          .write([item])
          .then(() => {
            toast.success('Copied png image to clipboard')
          })
          .catch((err: Error) => {
            console.error(err)
            toast.error(
              'Error copying image to clipboard. Check the console for details'
            )
          })
      })
      .catch((err: Error) => {
        console.error(err)
        toast.error('Error exporting image. Check the console for details')
      })
  }, [editorRef, safariWorkaroundHack])

  const [isResizing, setIsResizing] = React.useState(false)
  const numResizeSteps = React.useRef(0)
  const aspectRatio = currentWidth / currentHeight
  const isValidTwitterAspectRatio = aspectRatio <= 2 && aspectRatio >= 0.75

  const onClickTwitterSizing = React.useCallback(() => {
    if (!isValidTwitterAspectRatio) {
      numResizeSteps.current = 0
      setIsResizing(true)
    } else {
      toast.success('Image will not be cropped by Twitter')
      return
    }
  }, [isValidTwitterAspectRatio])

  React.useEffect(() => {
    if (!isResizing) {
      return
    }

    const aspectRatio = currentWidth / currentHeight
    if (isNaN(aspectRatio)) {
      setIsResizing(false)
      return
    }

    const stepSize = 10
    if (aspectRatio > 2) {
      const newWidth =
        numResizeSteps.current > 0
          ? currentWidth - stepSize
          : currentHeight * 2.35

      const width = Math.max(
        MIN_FRAME_WIDTH,
        Math.min(newWidth, MAX_FRAME_WIDTH)
      )

      if (width === currentWidth) {
        toast(
          'Image may still be cropped by Twitter because it has an aspect ratio > 2:1'
        )
        setIsResizing(false)
        return
      } else {
        updateConfig({ width })
      }
    } else if (aspectRatio < 0.75) {
      const newWidth =
        numResizeSteps.current > 0 ? currentWidth + stepSize : MAX_FRAME_WIDTH

      const width = Math.max(
        MIN_FRAME_WIDTH,
        Math.min(newWidth, MAX_FRAME_WIDTH)
      )

      if (width === currentWidth) {
        toast(
          'Image may still be cropped by Twitter because it has an aspect ratio < 3:4'
        )
        setIsResizing(false)
        return
      } else {
        updateConfig({ width })
        if (numResizeSteps.current === 0) {
          return
        }
      }
    } else {
      toast.success('Image aspect ratio has been optimized for Twitter')
      setIsResizing(false)
      return
    }

    if (++numResizeSteps.current > 100) {
      toast('Image may still be cropped by Twitter')
      setIsResizing(false)
    }
  }, [currentWidth, currentHeight, updateConfig, isResizing])

  return (
    <Paper className={cs(styles.container, className)}>
      <div className={styles.options}>
        <div className={cs(styles.option, styles.optionBackgroundImage)}>
          <label className={styles.label} htmlFor='select-backround-image'>
            Background Image
          </label>

          <Select
            id='select-background-image'
            placeholder='None'
            size='sm'
            value={backgroundImageOptionsMapBySrc[config.background]?.id}
            onChange={(event) => {
              const id = event.target.value
              const backgroundImageOption = backgroundImageOptionsMapById[id]
              const background = backgroundImageOption?.src
              updateConfig({ background })
            }}
          >
            {backgroundImageOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </Select>
        </div>

        <div className={cs(styles.option, styles.optionFontFamily)}>
          <label className={styles.label} htmlFor='select-font-family'>
            Font
          </label>

          <Select
            id='select-font-family'
            placeholder='System'
            value={config.fontFamily}
            size='sm'
            onChange={(event) => {
              updateConfig({ fontFamily: event.target.value })
            }}
          >
            {fontFamilies.map((fontFamily) => (
              <option key={fontFamily} value={fontFamily}>
                {fontFamily}
              </option>
            ))}
          </Select>
        </div>

        <div className={cs(styles.option, styles.optionFontSize)}>
          <label className={styles.label} htmlFor='input-font-size'>
            Font Size
          </label>

          <NumberInput
            id='input-font-size'
            value={`${config.fontSize}`}
            min={8}
            max={128}
            size='sm'
            onChange={(value) => {
              const parsedValue = parseInt(value)
              if (!isNaN(parsedValue) && parsedValue >= 0) {
                updateConfig({ fontSize: parsedValue })
              }
            }}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </div>

        <div className={cs(styles.option, styles.optionPadding)}>
          <label className={styles.label} htmlFor='input-padding'>
            Padding
          </label>

          <NumberInput
            id='input-padding'
            value={`${config.padding}`}
            min={0}
            max={64}
            size='sm'
            onChange={(value) => {
              const parsedValue = parseInt(value)
              if (!isNaN(parsedValue) && parsedValue >= 0) {
                updateConfig({ padding: parsedValue })
              }
            }}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </div>

        <div className={cs(styles.option, styles.optionAspectRatio)}>
          <label className={styles.label} htmlFor='input-aspect-ratio'>
            Aspect Ratio
          </label>

          <Tooltip
            hasArrow
            label={
              'Some social platforms require images to have a certain aspect ratio.'
            }
            shouldWrapChildren
            mt='3'
          >
            <div className={styles.aspectRatioContainer}>
              <Switch
                isChecked={config.aspectRatio !== 'auto'}
                onChange={(event) => {
                  if (event.target.checked) {
                    updateConfig({ aspectRatio: 2 })
                  } else {
                    updateConfig({ aspectRatio: 'auto' })
                  }
                }}
              />

              {config.aspectRatio === 'auto' ? (
                <Input
                  id='aspect-ratio'
                  className={styles.aspectRatioInput}
                  value='auto'
                  isDisabled={true}
                  size='sm'
                />
              ) : (
                <NumberInput
                  id='aspect-ratio'
                  className={styles.aspectRatioInput}
                  defaultValue={`${config.aspectRatio}`}
                  placeholder='auto'
                  min={0.4}
                  max={4.0}
                  step={0.01}
                  precision={2}
                  size='sm'
                  onChange={(value) => {
                    const parsedValue = parseFloat(value)

                    if (!isNaN(parsedValue) && parsedValue >= 0) {
                      updateConfig({ aspectRatio: parsedValue })
                    } else if (!value.trim()) {
                      updateConfig({ aspectRatio: 'auto' })
                    }
                  }}
                >
                  <NumberInputField />
                </NumberInput>
              )}
            </div>
          </Tooltip>
        </div>

        <div className={cs(styles.option, styles.optionSizing)}>
          <label className={styles.label} htmlFor='select-sizing'>
            Sizing
          </label>

          <Tooltip
            hasArrow
            label={
              isValidTwitterAspectRatio
                ? 'This content should not be cropped by Twitter as an inline image.'
                : "Resize content so Twitter won't crop it as an inline image."
            }
            shouldWrapChildren
            mt='3'
          >
            <Button
              id='select-sizing'
              size='sm'
              onClick={onClickTwitterSizing}
              disabled={isValidTwitterAspectRatio}
            >
              Twitter
            </Button>
          </Tooltip>
        </div>

        <Divider orientation='vertical' />

        <div className={cs(styles.option, styles.optionExportMenu)}>
          <Menu id='menu-export'>
            <MenuButton as={Button} size='lg' rightIcon={<ChevronDownIcon />}>
              Export
            </MenuButton>

            <Portal>
              <MenuList>
                <MenuItem onClick={onClickSaveToPNG}>Save png</MenuItem>
                <MenuItem onClick={onClickSaveToJPEG}>Save jpeg</MenuItem>
                <MenuItem onClick={onClickSaveToSVG}>Save svg</MenuItem>
                <MenuDivider />
                <MenuItem onClick={onClickCopyAsPNG}>Copy png</MenuItem>
              </MenuList>
            </Portal>
          </Menu>
        </div>
      </div>
    </Paper>
  )
}
