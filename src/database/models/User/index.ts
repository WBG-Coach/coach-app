// model/Post.js
import {Model} from '@nozbe/watermelondb';
import {date, readonly, text} from '@nozbe/watermelondb/decorators';

export default class User extends Model {
  static table = 'user';

  @text('name') name: any;
  @text('image_url') image_url: any;
  /* 
  @readonly @date('created_at') createdAt: any;
  @readonly @date('updated_at') updatedAt: any; */
}
