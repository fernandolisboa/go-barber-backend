import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider'
import IParseMailTemplateDTO from '@shared/container/providers/MailTemplateProvider/dtos/IParseMailTemplateDTO'

class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse(_: IParseMailTemplateDTO): Promise<string> {
    return 'Mail content'
  }
}

export default FakeMailTemplateProvider
