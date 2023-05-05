import {Model, Q} from '@nozbe/watermelondb';
import {
  date,
  immutableRelation,
  lazy,
  readonly,
  text,
} from '@nozbe/watermelondb/decorators';

export default class Teacher extends Model {
  static table = 'teacher';

  @lazy
  sessions = this.collections
    .get('session')
    .query(Q.where('teacher_id', this.id));

  @text('name') name: any;
  @text('coach_id') coach_id: any;
  @text('image_id') image_id: any;
  @immutableRelation('image', 'image_id') image: any;

  @readonly @date('created_at') createdAt: any;
  @readonly @date('updated_at') updatedAt: any;
}
