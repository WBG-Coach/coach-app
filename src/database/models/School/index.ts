// model/Post.js
import {Model, Q} from '@nozbe/watermelondb';
import {date, lazy, readonly, text} from '@nozbe/watermelondb/decorators';

export default class School extends Model {
  static table = 'school';

  static associations = {
    teachers: {type: 'has_many', foreignKey: 'school_id'},
  } as const;

  @lazy
  teachers = this.collections
    .get('teacher')
    .query(Q.where('school_id', this.id));

  @text('name') name: any;
  @readonly @date('created_at') createdAt: any;
  @readonly @date('updated_at') updatedAt: any;
}
