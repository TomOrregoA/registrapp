import { browser, element, by } from 'protractor';


//Pruebas en Login
describe('Pruebas página Login', () => {
  //Browse a la página de login o inicio por defecto
  beforeEach(() => {
    browser.get('/');
  });

  //Botón de inicio de sesión
  it('Página login tiene boton para iniciar sesion', () => {
    expect(element(by.css('.page-selected ion-button')).getText()).toContain('Ingresar');
  });

  //Formulario de inicio de sesión
  it('Página login tien un formulario con campos para ingresar credenciales de usuario', () => {
    expect(element(by.id('.page-selected user password')).getText()).toContain('Recuperar clave');
  });

  //Restaurar contraseña
  it('Página login tiene boton para recuperar contraseña', () => {
    element(by.id('password')).click();
    browser.driver.sleep(500);
    expect(element(by.css('.page-selected recovery-btn')).getText()).toContain('¿Ha olvidado sucontraseña?');
  });
});

//Pruebas en Password-Reset
describe('Pruebas password reset', () => {
  //Browse a la página de recuperar de contraseña
  beforeEach(() => {
    browser.get('/password-reset');
  });

  it('La página tiene un título que indica que se trata de restaurar contraseña', () => {
    expect(element(by.css('.page-selected h1')).getText()).toContain('Restaurar Contraseña');
  });

   //Formulario de inicio de restauración de contraseña
   it('Página password-reset tiene un formulario que permite ingresar el correo del usuario para restaurar su contraseña', () => {
    expect(element(by.css('.page-selected ion-label')).getText()).toContain('Correo de usuario');
  });

  //Regresar al login
  it('Página password-reset tiene boton para regresar al login', () => {
    element(by.css('.page-selected page-link')).click();
    browser.driver.sleep(500);
    expect(element(by.css('.page-selected page-link')).getText()).toContain('Volver al login');
  });

  //Restaurar contraseña
  it('Página password-reset tiene boton para restaurar constaseña', () => {
    element(by.css('.page-selected ion-button')).click();
    browser.driver.sleep(500);
    expect(element(by.css('.page-selected btn1')).getText()).toContain('Restaurar Password');
  });

});

//Pruebas en HOME
describe('Pruebas página home', () => {
  //Browse a la página home
  beforeEach(() => {
    browser.get('/home');
  });

  //Home
  it('En el home se le da la bienvenida al usuario', () => {
    expect(element(by.css('.page-selected h1')).getText()).toContain('Bienvenid@');
  });
  // Bontones de funcionalidades
  it('El home tiene un botón para escanear código QR', () => {
    expect(element(by.css('.page-selected ion-button')).getText()).toContain('Escanear QR');
  });
  it('El home tiene un botón para revisar la asistencia', () => {
    expect(element(by.css('.page-selected ion-button')).getText()).toContain('Asistencia');
  });
  it('El home tiene un botón para enviar el registro por correo', () => {
    expect(element(by.css('.page-selected ion-button')).getText()).toContain('Enviar registro');
  });
  it('El home tiene un botón para borrar el historial de registros(temporal)', () => {
    expect(element(by.css('.page-selected ion-button')).getText()).toContain('Borrar storage');
  });
});

/* describe('Pruebas página home', () => {
  //Browse a la página not found
  beforeEach(() => {
    browser.get('/404');
  });
  it('Error 404', () => {
    element(by.css('app-not-found')).click();
    browser.driver.sleep(500);
    expect(element(by.css('.page-selected ion-title'))).toContain('');
  });
}); */
