//loads metadata from server
const request = new XMLHttpRequest()

console.log('loads metadata')
request.open('GET','/api/storage/metadata',false)
request.send(null)
const metadata = JSON.parse(request.responseText)
window.metadata = JSON.parse(request.responseText)

//use metadata
document.getElementById('google-client-id-metadata').setAttribute('content',metadata.googleClientId)

//load colors
const html = document.querySelector('html')
html.style.setProperty('--color1',metadata.colors.one)
html.style.setProperty('--color2',metadata.colors.two)
html.style.setProperty('--color3',metadata.colors.three)
html.style.setProperty('--color4',metadata.colors.four)
html.style.setProperty('--color5',metadata.colors.five)
html.style.setProperty('--highlight',metadata.colors.highlight)