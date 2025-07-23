import { IMatchHistory } from '@/app';

const API_BASE_URL = 'https://api.tracker.gg/api/v2/valorant/standard';

export interface MatchHistoryResponse {
  data: IMatchHistory[];
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const playerTag = url.searchParams.get('playerTag') || 'BBL%20Gweep%23QUTI';
    const platform = url.searchParams.get('platform') || 'pc';
    const season = url.searchParams.get('season') || 'ac12e9b3-47e6-9599-8fa1-0bb473e5efc7';
    const type = url.searchParams.get('type') || 'competitive';

    const apiUrl = `${API_BASE_URL}/matches/riot/${playerTag}?platform=${platform}&season=${season}&type=${type}`;
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'en-US,en;q=0.9,tr;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Referer': 'https://tracker.gg/valorant/profile/riot/BBL%20Gweep%23QUTI/overview',
        'Origin': 'https://tracker.gg',
        'Cookie': 'cf_clearance=LkPTkec0Pw8BrJc7cusjeBdH2OiTftjXK8DMjkrCjkM-1753190305-1.2.1.1-2QOwA3g64BTQBdwG3pX8iNcx1oa0H1EAnhMBngSjEvQHfh1fsS45KIVSU.MqmsCLdjj_w_lCzQt4MpjZxLwbiCExVhbCLW.oGPykAnkLsLaKo9dLCgDdXx9B3w7nXUvuMizaZWahlqZMlZ.gIS.lQ60leVTPiENIxW.JyYmJ5ANYyg0bkdiKw4Z.pvrL5ZYjPuSe3u6zd5RrwYywSD9JErtBnPqDzsOsGJCAjGqH_ew; __cflb=02DiuFQAkRrzD1P1mdm8JatZXtAyjoPD1jBFkikqoqjBz; __stripe_mid=45e1dcb6-11ff-4d61-a816-026e09d13ba95e237c; __cf_bm=CAwUcdoL2OpsH3pPBAGN3u9aKSIWf2gWkXvrnBOWqnQ-1753205640-1.0.1.1-7EU.WweIGlkgHcNLUFDUpAEj_EYB6a3R28HwJANU9fUjb1_.bdnlDpGNRPwDY03F313d2apMnDLkP8K7KspG6u93hQiWDM4KSLF4.C6Dmy1syNl2B5LWDF.Yat7YX5GV',
        'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IkU4NTE1OEM3NDhGNzU1MzgxOUQwQUU5MDVGM0Q1OTkxMjI4MTg3QzIiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiI2RkZZeDBqM1ZUZ1owSzZRWHoxWmtTS0JoOEkifQ.eyJuYmYiOjE3NTMyMDQzODAsImV4cCI6MTc1MzIwNzk4MCwiaXNzIjoiaHR0cHM6Ly9hY2NvdW50LnRyYWNrZXIuZ2ciLCJhdWQiOlsiYWNjb3VudCIsImFwaSIsImV2ZW50cyJdLCJjbGllbnRfaWQiOiIwYWYyNTIxZS0zM2U5LTRkNDAtODM2ZS02Zjg2NWNiOTg4NzAiLCJzdWIiOiIxMjMwNzIzMyIsImF1dGhfdGltZSI6MTc1MzE5MDU0NiwiaWRwIjoidHRuIiwicm9sZSI6IlVzZXIiLCJuYW1lIjoiZjQ0ZGVkODAtMjQzYi00ZWEyLWFjMWUtOWU3ODk4NDhhNjNiIiwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsImFjY291bnQiLCJhcGkiLCJldmVudHMiLCJvZmZsaW5lX2FjY2VzcyJdLCJhbXIiOlsiZXh0ZXJuYWwiXX0.HrxCWVTKiWXcvRy-02J33zhetSguQHPmZiA1ydHAvn5CwIQ678VWJEwKGAnLtkBwMRUsntt3WeJckZ6P5PRI_UWMqknyUU4Vr805fRuZPZGiOX_9Yq1I8BeNM5CVIx43J27arMMSw86QKSHqok_mOynzglWryREcjU09ESSapjg8tQP0pUx-fFvl5h1U3MpcSC39CLY6U5jvSHB-b6C8HLIVERAHN_AhayRCKS5wDpbLfAUOCuEalNin0jyHusR8BbMLSJnQdseElsi0W2uMpVvriSpQfSchgfiCQoXX3paHSOGFsaxnDus6RSggko3s2-2INBqxbCan3YulivGAZdK0a0I5u1mqRtoRHMLKR_8zss7cMWXqsx2InZaBlEmW8LQMkuH_k2zgUKzMGdf8_RFQNdLECMCM4w1yBDY8T8jY9gqcwzeHypYt-X7xnXLEty1aVFLRjHqrx-CrqfbC-39D1G5qp958oWusfpxob0eKBiJV0z5JK5W85o-xQsD9GZ6zOTYGU8snyDr8mhmFGPE0ckzSFRN3DhXa-MYTbLDCzWViJ1aJktUpFrjb0c0YwcE-I-hLGimiVJa3xedjaefJOtZzIUPJz3rSGjphqmX_a-q-t4_RNQ1Qrm8VGOqERPKOOzH_aEVLsKMj3YCdm31oV5GCnpv4uYtYym64Mzw',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      },
    });

    if (!response.ok) {
        console.log("Error:", response.status, response.statusText);
      return Response.json(
        { error: `Failed to fetch match history: ${response.status} ${response.statusText}` },
        { status: response.status }
      );
    }

    const data: MatchHistoryResponse = await response.json();
    console.log("data:", data);
    
    return Response.json(data.data);
  } catch (error) {
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

