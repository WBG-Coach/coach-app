// model/Post.js
import {Model} from '@nozbe/watermelondb';
import {date, readonly, text} from '@nozbe/watermelondb/decorators';

export default class School extends Model {
  static table = 'school';

  @text('name') name: any;
  @text('image_url') image_url: any;

  @readonly @date('created_at') createdAt: any;
  @readonly @date('updated_at') updatedAt: any;
}
