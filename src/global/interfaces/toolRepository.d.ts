interface IToolPreSave {
  title: string;
  link: string;
  description: string;
  tags: IBaseObject[];
}

interface ICreatedTool {
  title: string;
  link: string;
  description: string;
  tags: Tag[];
}

interface ITools extends Tool {
  tags: {
    name: string;
  }[];
}