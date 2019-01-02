/** @format */

// Generate required css
import iconFont from "react-native-vector-icons/Fonts/FontAwesome.ttf"

export default function() {
  const iconFontStyles = `@font-face {
  src: url(${iconFont});
  font-family: FontAwesome;
}`

  // Create stylesheet
  const style = document.createElement("style")
  style.type = "text/css"
  style.appendChild(document.createTextNode(iconFontStyles))

  // Inject stylesheet
  if (document.head !== null) document.head.appendChild(style)
}
