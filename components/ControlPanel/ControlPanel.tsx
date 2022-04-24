import * as React from 'react'
import cs from 'clsx'
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
  MenuDivider
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'

import { Paper } from '~/components/Paper/Paper'
import { useEditorStore } from '~/lib/editor-store'

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
  const { config, updateConfig, container } = useEditorStore()

  const onClickSaveToPNG = React.useCallback(() => {
    if (!container) {
      return
    }

    toPng(container)
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
  }, [container])

  const onClickSaveToJPEG = React.useCallback(() => {
    if (!container) {
      return
    }

    toJpeg(container, { quality: 0.9 })
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
  }, [container])

  const onClickSaveToSVG = React.useCallback(() => {
    if (!container) {
      return
    }

    toSvg(container)
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
  }, [container])

  const onClickCopyAsPNG = React.useCallback(async () => {
    if (!container) {
      return
    }

    toBlob(container)
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
  }, [container])

  return (
    <Paper className={cs(styles.container, className)}>
      <div className={styles.options}>
        <div className={cs(styles.option, styles.optionBackgroundImage)}>
          <label htmlFor='select-backround-image'>Background Image</label>

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
          <label htmlFor='select-font-family'>Font</label>

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
          <label htmlFor='input-font-size'>Font Size</label>

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
          <label htmlFor='input-padding'>Padding</label>

          <NumberInput
            id='padding'
            value={`${config.padding}`}
            min={0}
            max={64}
            size='sm'
            onChange={(value) => {
              console.log(value)
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
