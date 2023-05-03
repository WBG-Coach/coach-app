import {Model} from '@nozbe/watermelondb';
import {relation, text} from '@nozbe/watermelondb/decorators';

export default class Session extends Model {
  static table = 'session';

  @text('session_status') session_status?: string;
  @text('boys_count') boys_count?: string;
  @text('girls_count') girls_count?: string;
  @text('subject') subject?: string;
  @text('lesson_time') lesson_time?: string;
  @text('objective') objective?: string;
  @text('key_points') key_points?: string;
  @relation('coach', 'coach_id') coach?: any;
  @relation('school', 'school_id') school?: any;
  @relation('teacher', 'teacher_id') teacher?: any;
}
