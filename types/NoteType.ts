interface NoteType {
  _id?: string;
  title: string;
  topic: string[];
  body: string;
  user?: {
    _id: string;
    name: string;
    email: string;
    image: string;
    createdAt: string;
    updatedAt: string;
  };
}

export { NoteType };
