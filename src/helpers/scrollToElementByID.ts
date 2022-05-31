// Add the following mixing to the element to avoid it being hidden under the header bar
// @include scrollSection;
export const scrollToElementById = (id: string) => {
  const section = document.querySelector(`#${id}`)
  section && section.scrollIntoView({ behavior: 'smooth' })
}
