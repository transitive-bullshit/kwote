<p align="center">
  <a href="https://kwote.app">
    <img alt="Kwote makes it easy to create beautiful images that capture your attention." src="https://user-images.githubusercontent.com/552829/165194965-43990aa4-598e-4f0c-975f-a479bb8bfc7a.png">
  </a>
</p>

<p align="center">
  <a href="https://github.com/transitive-bullshit/nextjs-notion-starter-kit/actions/workflows/build.yml"><img src="https://github.com/transitive-bullshit/nextjs-notion-starter-kit/actions/workflows/build.yml/badge.svg" /></a>
  <a href="https://prettier.io"><img src="https://img.shields.io/badge/code_style-prettier-brightgreen.svg" /></a>
</p>

## Features

- Easy text highlights via normal rich text formatting
  - Yellow = Bold, Blue = Italic
- Export to png, jpeg, svg, or copy png to clipboard
- Supports locking the aspect ratio
- Supports aspect ratio optimization for twitter
  - For twitter inline images, max 2.0, min 0.75 (otherwise the image will be cropped)
  - For twitter social card images, preferably 2.0 or 1.91
- Background gradient images
- Google fonts
- Syncs state to local storage
- Simple, free, and open source 💕

## Examples

![Example kwote](https://user-images.githubusercontent.com/552829/165195353-b946163b-c08c-4442-82e0-a1cec00ca68c.png)
By [Richard Hamming](https://www.cs.virginia.edu/~robins/YouAndYourResearch.html)

---

![Example kwote](https://user-images.githubusercontent.com/552829/165353058-0dfe6761-a844-4d47-992a-21729964f06b.jpg)
By [Aza Raskin](https://uxmag.com/articles/you-are-solving-the-wrong-problem)

---

![Example kwote](https://user-images.githubusercontent.com/552829/165196468-83400600-2718-4eaf-bb97-9057b0513548.png)
By [Steven Pressfield](https://stevenpressfield.com/2009/10/writing-wednesdays-2-the-most-important-writing-lession-i-ever-learned/)

---

![Example kwote](https://user-images.githubusercontent.com/552829/165196212-ba1e03a5-f3f5-42fe-91bd-089550843d3c.png)
By [David Foster Wallace](https://www.goodreads.com/work/quotes/7144014-although-of-course-you-end-up-becoming-yourself-a-road-trip-with-david)

---

![Example kwote](https://user-images.githubusercontent.com/552829/165354808-90a8e6c6-d0e6-4f0b-ba73-c4ecec9a8981.jpg)
By [Richard Hamming](https://www.cs.virginia.edu/~robins/YouAndYourResearch.html)

---

Have a great quote you'd like to see added here? Post your quote image on Twitter and tag me [@transitive_bs](https://twitter.com/transitive_bs).

## FAQ

### How do I use Kwote?

1. Open [kwote.app](https://kwote.app/)
2. Replace the main text with your favorite quote
3. Highlight any important parts of the text you want to call out
4. Export your image 👻

Note that Kwote is a webapp optimized for desktop browsers, though mobile is also supported.

### How do I highlight things?

Select any text you want to highlight and mark it as bold (yellow) or italic (blue) using either your standard system keyboard shortcuts or by selecting the color from the selection popup.

_Italic text will have a blue highlight._ (CMD + I or Control + I)

**Bold text will have a yellow highlight.** (CMD + B or Control + B)

### How does Kwote work?

Kwote's editor is built using the [Lexical](https://github.com/facebook/lexical) text editing framework from Facebook. We replaced the normal bold formatting with a yellow highlight and the normal italic formatting with a blue highlight ([via CSS](https://github.com/transitive-bullshit/kwote/blob/858212b8e1605dea90cba669cdedf76a1f17f39f/components/Editor/styles.module.css#L61-L77)).

We use [html-to-image](https://github.com/bubkoo/html-to-image) to render the resulting image client-side via some cool [SVG magic](https://github.com/bubkoo/html-to-image#how-it-works).

The webapp itself is built using [Next.js](https://nextjs.org/), [React](https://reactjs.org/), and [Vercel](https://vercel.com/).

### How can I add a quote to this readme?

Post the image on Twitter and tag me [@transitive_bs](https://twitter.com/transitive_bs). I'll retweet my favorite quotes, and if I receive enough submissions, I'll add them to a gallery on the main site.

## License

MIT © [Travis Fischer](https://transitivebullsh.it)

Support my open source work by <a href="https://twitter.com/transitive_bs">following me on twitter <img src="https://storage.googleapis.com/saasify-assets/twitter-logo.svg" alt="twitter" height="24px" align="center"></a>
