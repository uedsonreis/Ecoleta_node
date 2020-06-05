
interface ImageContent { image: string }

export function serializeImage(content: ImageContent) {
    return {
        ...content,
        imageUrl: `http://192.168.0.25:3333/uploads/${content.image}`
    }
}

export function serializeImages(contents: ImageContent[]) {
    return contents.map(item => (serializeImage(item)))
}
