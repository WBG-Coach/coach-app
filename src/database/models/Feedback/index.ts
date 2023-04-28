// model/Post.js
import {Model} from '@nozbe/watermelondb';
import {date, readonly, text} from '@nozbe/watermelondb/decorators';

export default class Feedback extends Model {
  static table = 'feedback';

  @text('value') value: any;
  @text('session_id') question_id?: any;
  @readonly @date('created_at') createdAt: any;
  @readonly @date('updated_at') updatedAt: any;
}
