// utils/getLogin.js
export async function getLogin(username, password) {
    try {
      const response = await fetch('https://arbi.com.ar/api/auth/local', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier: username,
          password: password,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message[0].messages[0].message);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Error al iniciar sesión. Verifica tus credenciales.');
    }
  }
  