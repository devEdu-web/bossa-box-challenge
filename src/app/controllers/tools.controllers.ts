import { Tool, Tag } from '@prisma/client'
import { Request, Response } from 'express'
import client from '../../database/client'
import Utils from '../../utils/Utils'

interface addToolPayload {
  title: string
  link: string
  description: string
  tags: Array<string>
}

class ToolsController {
  async addTool(req: Request<{}, {}, addToolPayload>, res: Response) {
    try {
      const { title, link, description, tags } = req.body
      const tagsInObject = Utils.genCreateTagsArray(tags)

      let result: any = await client.tool.upsert({
        where: {
          title: title
        },
        update: {
          title,
          link,
          description
        },
        create: {
          title,
           link,
           description,
           tags: {
            create: tagsInObject
          }
        },
        select: {
          id: true,
          title: true,
          link: true,
          description: true,
          tags: true
        }
      })
    
      result.tags = tags // Overwrite the array with objects - [{name: 'tag1'}, {name: 'tag2'}]
      res.status(201).json(result)
    } catch (error: any) {
      res.status(400).json({
        message: error.message
      })
    }
   
  }
}

export default new ToolsController()