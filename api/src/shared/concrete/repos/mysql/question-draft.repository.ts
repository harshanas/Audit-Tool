import { initMysql } from './connection.manager';
import { IQuestionDraftRepository } from '../../../abstract/repos/question-draft.repository';
import { injectable } from 'inversify';
import { QuestionDraft as QuestionDraftEntity } from './entity/question_draft';
import { mapDbItems, questionMapper, questionDraftMapper } from './dbMapper';
@injectable()
export class MySQLQuestionDraftRepository implements IQuestionDraftRepository {
  async getQuestionsByKnowledgeAreaId(
    knowledgeAreaId: number,
  ): Promise<Array<import('../../../models/question-draft').QuestionDraft>> {
    let connection: any;
    try {
      connection = await initMysql();
      const result = await connection
        .getRepository(QuestionDraftEntity)
        .createQueryBuilder('question')
        .where('question.knowledgeAreaId = :knowledgeAreaId', {
          knowledgeAreaId,
        })
        .orderBy('question.majorVersion', 'ASC')
        .addOrderBy('question.minorVersion', 'ASC')
        .addOrderBy('question.patchVersion', 'ASC')
        .getRawMany();
      const mappedItems = mapDbItems(result, questionDraftMapper);
      let orderIds = [];
      let latestItems = [];
      for (const item in mappedItems) {
        orderIds.push(mappedItems[item].orderId);
      }
      orderIds = [...new Set(orderIds)];
      for (const key in orderIds) {
        const sameOrderId = mappedItems.filter(item => {
          return item.orderId == orderIds[key];
        });
        latestItems.push(sameOrderId[sameOrderId.length - 1]);
      }
      latestItems = latestItems.sort(function(firstEl, secondEl){
        return firstEl.orderId - secondEl.orderId;
      })
      return latestItems;
    } catch (err) {
      throw err;
    } finally {
      if (connection != null) {
        await connection.close();
      }
    }
  }
  get(_itemId: number): import('../../../models/question-draft').QuestionDraft {
    throw new Error('Method not implemented.');
  }
  add(_item: import('../../../models/question-draft').QuestionDraft) {
    throw new Error('Method not implemented.');
  }
  update(
    _itemId: number,
    _item: import('../../../models/question-draft').QuestionDraft,
  ) {
    throw new Error('Method not implemented.');
  }
  delete(_itemId: number) {
    throw new Error('Method not implemented.');
  }
}
