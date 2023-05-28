import {Model, Q} from '@nozbe/watermelondb';
import {
  date,
  lazy,
  text,
  readonly,
  immutableRelation,
} from '@nozbe/watermelondb/decorators';

export default class Teacher extends Model {
  static table = 'teacher';

  static associations = {
    sessions: {type: 'has_many', foreignKey: 'session_id'},
  } as const;

  @lazy
  sessions = this.collections
    .get('session')
    .query(Q.where('teacher_id', this.id));

  @text('name') name: any;
  @text('surname') surname: any;
  @text('subject') subject: any;
  @text('birthdate') birthdate: any;
  @text('emis_number') emis_number: any;
  @text('school_id') school_id: any;
  @text('image_id') image_id: any;
  @immutableRelation('image', 'image_id') image: any;

  @readonly @date('created_at') createdAt: any;
  @readonly @date('updated_at') updatedAt: any;
}
