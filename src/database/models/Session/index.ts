import {Model, Q} from '@nozbe/watermelondb';
import {
  date,
  lazy,
  readonly,
  relation,
  text,
} from '@nozbe/watermelondb/decorators';

export default class Session extends Model {
  static table = 'session';

  static associations = {
    answers: {type: 'has_many', foreignKey: 'session_id'},
    feedbacks: {type: 'has_many', foreignKey: 'session_id'},
  } as const;

  @lazy
  answers = this.collections
    .get('answer')
    .query(Q.where('session_id', this.id));

  @lazy
  feedback = this.collections
    .get('feedback')
    .query(Q.where('session_id', Q.eq(this.id)));

  @text('session_status') session_status?: string;
  @text('boys_count') boys_count?: string;
  @text('girls_count') girls_count?: string;
  @text('subject') subject?: string;
  @text('lesson_time') lesson_time?: string;
  @text('objective') objective?: string;
  @text('key_points') key_points?: string;
  @text('school_id') school_id: any;
  @text('coach_id') coach_id: any;
  @text('teacher_id') teacher_id: any;
  @relation('coach', 'coach_id') coach?: any;
  @relation('school', 'school_id') school?: any;
  @relation('teacher', 'teacher_id') teacher?: any;

  @readonly @date('created_at') createdAt: any;
  @readonly @date('updated_at') updatedAt: any;
}
