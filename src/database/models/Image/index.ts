// model/Post.js
import {Model} from '@nozbe/watermelondb';
import {date, readonly, text} from '@nozbe/watermelondb/decorators';

export default class Image extends Model {
  static table = 'image';

  @text('name') name: any;
  @text('value') value: any;
  @text('external_id') external_id?: any;
  @readonly @date('created_at') createdAt: any;
  @readonly @date('updated_at') updatedAt: any;
}
