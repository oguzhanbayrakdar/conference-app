export class UploadedFile{
	id: string;
	name: string
	size: number
	type: string
	path?: string;

	constructor(details: UploadedFile) {
		this.id = details.id
		this.name = details.name
		this.size = details.size
		this.type = details.type
		this.path = details.path		
	}
}