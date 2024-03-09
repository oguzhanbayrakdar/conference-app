import { UploadedFile } from "./uploadedFile"

export class Conference{
	id: string
	name: string
	start: Date
	end: Date
	description?: string
	files?: UploadedFile[]

	constructor(details: Conference) {
		this.id = details.id
		this.name = details.name
		this.start = details.start
		this.end = details.end
		this.description = details.description
		this.files = details.files
	}
}
