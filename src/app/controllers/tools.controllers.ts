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

interface deleteToolPayload {
  id: string
}

class ToolsController {
  async addTool(req: Request<{}, {}, addToolPayload>, res: Response) {
    try {
      const { title, link, description, tags } = req.body
      const tagsInObject = Utils.genCreateTagArray(tags)

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
      Utils.log.info('New tool created with its relations.')
      result.tags = tags // Overwrite the array of objects - [{name: 'tag1'}, {name: 'tag2'}] with just an array ['tag1', 'tag2']
      return res.status(201).json(result)
    } catch (error: any) {
      Utils.log.info(`Error trying to add new tool. Message: ${error.message}`)
      return res.status(400).json({
        message: error.message
      })
    }
  }

  async getTools(req: Request, res: Response) {
    try {
      const tools: any = await client.tool.findMany({
        include: {
          tags: {
            select: {
              name: true
            }
          }
        }
      })
      const result = Utils.removeNamePropertyFromToolTagsArray(tools)
      Utils.log.info('All tools returned to the client.')
      return res.json(result)
    } catch(error: any) {
      Utils.log.error(`Error trying to get tools. Message: ${error.message}`)
      return res.status(400).json([])
    }
    
  }

  async deleteTool(req: Request, res: Response) {
    const { id } = req.params

    await client.tool.delete({
      where: {
        id: Number(id)
      }
    })

    return res.sendStatus(200)

  }
}

export default new ToolsController()