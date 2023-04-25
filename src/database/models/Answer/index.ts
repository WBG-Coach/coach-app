// model/Post.js
import {Model} from '@nozbe/watermelondb';
import {date, readonly, relation, text} from '@nozbe/watermelondb/decorators';

export default class Answer extends Model {
  static table = 'answer';

  @text('value') value: any;
  @text('question_id') question_id: any;
  @relation('question', 'question_id') question?: any;
  @readonly @date('created_at') createdAt: any;
  @readonly @date('updated_at') updatedAt: any;
}
