export class ConferenceDTO{
	id?: string;
	name!: string
	start!: Date
	end!: Date
	description?: string
	files?: File[]
}
