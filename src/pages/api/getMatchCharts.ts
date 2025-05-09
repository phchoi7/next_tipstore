import type { NextApiRequest, NextApiResponse } from 'next';
import { s2t } from 'chinese-s2t';
export default async function handler(
  req: { query: { rowNo: any } },
  res: { status: (arg0: number) => { (): any; new (): any; json: { (arg0: { error: string }): void; new (): any } } }
) {
  const { rowNo } = req.query;
  const ProxyServer = 'https://cors.bridged.cc/';
  const API_URL = `${ProxyServer}https://www.zucaijia.com/zcj/jincai/getDetailYcChartsInfo?rowNo=${rowNo}`;

  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      mode: 'cors',
      headers: {
        origin: '*',
        'x-request-url': 'txt-api.7m.com.cn',
        'x-cors-grida-api-key': 'fec76fa0-7a9f-44e5-b4da-1ad50c338b43',
      },
    });

    const data = await response.json();
    const translatedData = JSON.parse(JSON.stringify(data), (key, value) =>
      typeof value === 'string' ? s2t(value) : value
    );

    res.status(200).json(translatedData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch YC charts info' });
  }
}
