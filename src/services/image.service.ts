import {getDBConnection} from './database.service';
import * as RNC from 'react-native-compressor';
import RNFS from 'react-native-fs';
import {v4 as uuid} from 'uuid';
import {Image} from '../types/image';

const IMAGE_PREFIX = 'data:image/png;base64,';

export const ImageService = {
  saveNewImage: async (
    imageName: string,
    imageValue: string,
    externalId: string = '',
  ): Promise<string> => {
    const newImg = await RNC.Image.compress(imageValue, {
      maxWidth: 100,
      maxHeight: 100,
      quality: 0.8,
    });

    const base64 =
      'data:image/png;base64,' + (await RNFS.readFile(newImg, 'base64'));

    const db = await getDBConnection();

    const id = uuid();

    await db.executeSql(`
      INSERT OR REPLACE INTO image(id, name, value, external_id, _status)
      VALUES ('${id}', '${imageName}', '${base64}', '${externalId}', 'pending')
    `);

    return id;
  },

  updateImage: async (
    id: string,
    imageName: string,
    imageValue: string,
    externalId: string = '',
  ): Promise<string> => {
    if (!imageValue.startsWith(IMAGE_PREFIX)) {
      const newImg = await RNC.Image.compress(imageValue, {
        maxWidth: 100,
        maxHeight: 100,
        quality: 0.8,
      });

      const base64 = IMAGE_PREFIX + (await RNFS.readFile(newImg, 'base64'));

      const db = await getDBConnection();

      await db.executeSql(`
        UPDATE image
        SET name = '${imageName}', value = '${base64}', external_id = '${externalId}', _status = 'pending'
        WHERE id = '${id}'
      `);
    }

    return id;
  },

  getImagesByExternalId: async (externalId: string): Promise<Image[]> => {
    const db = await getDBConnection();
    const result = (await db.executeSql(
      `
        SELECT *
        FROM image
        WHERE external_id != ''
        AND external_id = ?
      `,
      [externalId],
    )) as any[];

    return result[0].rows.raw();
  },
};
