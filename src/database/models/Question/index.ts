// model/Post.js
import {Model} from '@nozbe/watermelondb';
import {
  date,
  immutableRelation,
  readonly,
  text,
} from '@nozbe/watermelondb/decorators';

export default class Question extends Model {
  static table = 'question';

  static associations = {
    competence: {type: 'belongs_to', key: 'competence_id'},
  } as const;

  @text('title') title: any;
  @text('description') description: any;
  @text('tooltip_data') tooltip_data: any;
  @text('scale') scale: any;
  @text('type') type: any;
  @text('competence_id') competence_id: any;
  @immutableRelation('competence', 'competence_id') competence: any;
  @readonly @date('created_at') createdAt: any;
  @readonly @date('updated_at') updatedAt: any;
}
