export interface DataType {
	id: number;
	title: string;
	text: string;
	url: string;
	time: number;
	type: string;
	by: string;
	descendants: number;
	score: 1;
	kids?: number[] | undefined;
}
