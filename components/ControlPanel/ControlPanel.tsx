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
import { MIN_FRAME_WIDTH, MAX_FRAME_WIDTH } from '~/lib/config'

import styles from './styles.module.css'

type BackgroundImageOption = {
  url: string
  name: string
}

const backgroundImageOptions: BackgroundImageOption[] = [
  { url: '/images/00.jpg', name: 'Gradient 1' },
  { url: '/images/01.jpg', name: 'Gradient 2' },
  { url: '/images/02.jpg', name: 'Gradient 3' },
  { url: '/images/03.jpg', name: 'Gradient 4' },
  { url: '/images/04.jpg', name: 'Gradient 5' },
  { url: '/images/05.jpg', name: 'Gradient 6' },
  { url: '/images/06.jpg', name: 'Gradient 7' },
  { url: '/images/07.jpg', name: 'Gradient 8' },
  { url: '/images/08.jpg', name: 'Gradient 9' },
  { url: '/images/09.jpg', name: 'Gradient 10' },
  { url: '/images/10.jpg', name: 'Gradient 11' },
  { url: '/images/11.jpg', name: 'Gradient 12' },
  { url: '/images/12.jpg', name: 'Gradient 13' },
  { url: '/images/13.jpg', name: 'Gradient 14' },
  { url: '/images/14.jpg', name: 'Gradient 15' },
  { url: '/images/15.jpg', name: 'Gradient 16' },
  { url: '/images/16.jpg', name: 'Gradient 17' },
  { url: '/images/17.jpg', name: 'Gradient 18' },
  { url: '/images/18.jpg', name: 'Gradient 19' },
  { url: '/images/19.jpg', name: 'Gradient 20' },
  { url: '/images/20.jpg', name: 'Gradient 21' }
]

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

  const onClickSaveToPNG = React.useCallback(() => {
    if (!editorRef) {
      return
    }

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
  }, [editorRef])

  const onClickSaveToJPEG = React.useCallback(() => {
    if (!editorRef) {
      return
    }

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
  }, [editorRef])

  const onClickSaveToSVG = React.useCallback(() => {
    if (!editorRef) {
      return
    }

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
  }, [editorRef])

  const onClickCopyAsPNG = React.useCallback(async () => {
    if (!editorRef) {
      return
    }

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
  }, [editorRef])

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
            value={config.background}
            size='sm'
            onChange={(event) => {
              updateConfig({ background: event.target.value })
            }}
          >
            {backgroundImageOptions.map((option) => (
              <option key={option.url} value={option.url}>
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
                    console.log('aspectRatio', parsedValue)

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
                <MenuItem>Copy URL</MenuItem>
              </MenuList>
            </Portal>
          </Menu>
        </div>
      </div>
    </Paper>
  )
}
