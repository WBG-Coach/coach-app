// model/Post.js
import {Model} from '@nozbe/watermelondb';
import {
  date,
  immutableRelation,
  readonly,
  text,
} from '@nozbe/watermelondb/decorators';

export default class Feedback extends Model {
  static table = 'feedback';

  @text('value') value: any;
  @text('session_id') session_id?: any;
  @text('competence_id') competence_id?: any;
  @immutableRelation('competence', 'competence_id') competence: any;
  @readonly @date('created_at') createdAt: any;
  @readonly @date('updated_at') updatedAt: any;
}
