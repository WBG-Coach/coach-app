// model/Post.js
import {Model} from '@nozbe/watermelondb';
import {date, readonly, relation, text} from '@nozbe/watermelondb/decorators';

export default class Question extends Model {
  static table = 'question';

  @text('title') title: any;
  @text('description') description: any;
  @text('tooltip_data') tooltip_data: any;
  @text('type') type: any;
  @text('competence_id') competence_id: any;
  @relation('competence', 'competence_id') competence?: any;
  @readonly @date('created_at') createdAt: any;
  @readonly @date('updated_at') updatedAt: any;
}
