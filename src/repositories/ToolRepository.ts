import client from '../database/client';

interface IToolRepository {
  create(tool: IToolPreSave): Promise<ICreatedTool | undefined>;
  getTools(): Promise<ITools[] | []>;
  filterToolByTag(tag: string): Promise<ITools[] | []>;
  deleteTool(id: number): Promise<boolean>;
}

export class ToolRepository implements IToolRepository {
  async create(tool: IToolPreSave): Promise<ICreatedTool | undefined> {
    try {
      const { title, description, link, tags } = tool;
      let result = await client.tool.upsert({
        where: {
          title: title,
        },
        update: {
          title,
          link,
          description,
        },
        create: {
          title,
          link,
          description,
          tags: {
            create: tags,
          },
        },
        select: {
          id: true,
          title: true,
          link: true,
          description: true,
          tags: true,
        },
      });
      return result;
    } catch (error) {
      return undefined;
    }
  }

  async getTools(): Promise<ITools[] | []> {
    try {
      const tools = await client.tool.findMany({
        include: {
          tags: {
            select: {
              name: true,
            },
          },
        },
      });

      return tools;
    } catch (error) {
      return [];
    }
  }

  async filterToolByTag(tag: string): Promise<ITools[] | []> {
    try {
      const tools = await client.tool.findMany({
        where: {
          tags: {
            some: {
              name: tag,
            },
          },
        },
        include: {
          tags: {
            select: {
              name: true,
            },
          },
        },
      });
      return tools;
    } catch (error) {
      return [];
    }
  }

  async deleteTool(id: number): Promise<boolean> {
    try {
      await client.tool.delete({
        where: {
          id: Number(id),
        },
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}
