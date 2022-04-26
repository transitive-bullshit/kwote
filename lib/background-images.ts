import image00 from '/public/images/00.jpg'
import image01 from '/public/images/01.jpg'
import image02 from '/public/images/02.jpg'
import image03 from '/public/images/03.jpg'
import image04 from '/public/images/04.jpg'
import image05 from '/public/images/05.jpg'
import image06 from '/public/images/06.jpg'
import image07 from '/public/images/07.jpg'
import image08 from '/public/images/08.jpg'
import image09 from '/public/images/09.jpg'
import image10 from '/public/images/10.jpg'
import image11 from '/public/images/11.jpg'
import image12 from '/public/images/12.jpg'
import image13 from '/public/images/13.jpg'
import image14 from '/public/images/14.jpg'
import image15 from '/public/images/15.jpg'
import image16 from '/public/images/16.jpg'
import image17 from '/public/images/17.jpg'
import image18 from '/public/images/18.jpg'
import image19 from '/public/images/19.jpg'
import image20 from '/public/images/20.jpg'

export type BackgroundImageOption = {
  src: string
  id: string
  name: string
}

export const backgroundImageOptions: BackgroundImageOption[] = [
  { src: image00.src, name: 'Gradient 1', id: '0' },
  { src: image01.src, name: 'Gradient 2', id: '1' },
  { src: image02.src, name: 'Gradient 3', id: '2' },
  { src: image03.src, name: 'Gradient 4', id: '3' },
  { src: image04.src, name: 'Gradient 5', id: '4' },
  { src: image05.src, name: 'Gradient 6', id: '5' },
  { src: image06.src, name: 'Gradient 7', id: '6' },
  { src: image07.src, name: 'Gradient 8', id: '7' },
  { src: image08.src, name: 'Gradient 9', id: '8' },
  { src: image09.src, name: 'Gradient 10', id: '9' },
  { src: image10.src, name: 'Gradient 11', id: '10' },
  { src: image11.src, name: 'Gradient 12', id: '11' },
  { src: image12.src, name: 'Gradient 13', id: '12' },
  { src: image13.src, name: 'Gradient 14', id: '13' },
  { src: image14.src, name: 'Gradient 15', id: '14' },
  { src: image15.src, name: 'Gradient 16', id: '15' },
  { src: image16.src, name: 'Gradient 17', id: '16' },
  { src: image17.src, name: 'Gradient 18', id: '17' },
  { src: image18.src, name: 'Gradient 19', id: '18' },
  { src: image19.src, name: 'Gradient 20', id: '19' },
  { src: image20.src, name: 'Gradient 21', id: '20' }
]

export const backgroundImageOptionsMapBySrc = backgroundImageOptions.reduce<
  Record<string, BackgroundImageOption>
>((map, option) => ({ ...map, [option.src]: option }), {})

export const backgroundImageOptionsMapById = backgroundImageOptions.reduce<
  Record<string, BackgroundImageOption>
>((map, option) => ({ ...map, [option.id]: option }), {})
