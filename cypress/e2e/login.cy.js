/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when email is empty
 *   - should display alert when password is empty
 *   - should display alert when email and password are wrong
 *   - should display homepage when email and password are correct
 */

describe('Login  spec', () => {
  it('should display login page correctly', () => {
    cy.visit('http://localhost:3000/login');

    // memverifikasi elemen yang harus tampak pada halaman login
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button').contains(/^Login$/).should('be.visible');
  });

  it('should display alert when email is empty', () => {
    cy.visit('http://localhost:3000/login');
    // klik tombol login tanpa mengisi username
    cy.get('button').contains(/^Login$/).click();

    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    });
  });

  it('should display alert when password is empty', () => {
    cy.visit('http://localhost:3000/login');
    // mengisi username
    cy.get('input[placeholder="Email"]').type('email@gmail.com');

    // klik tombol login tanpa mengisi password
    cy.get('button').contains(/^Login$/).click();

    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it('should display alert when username and password are wrong', () => {
    cy.visit('http://localhost:3000/login');
    // mengisi username
    cy.get('input[placeholder="Email"]').type('email@gmail.com');

    // mengisi password yang salah
    cy.get('input[placeholder="Password"]').type('123456');

    // menekan tombol Login
    cy.get('button').contains(/^Login$/).click();

    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });
  });

  it('should display homepage when username and password are correct', () => {
    cy.visit('http://localhost:3000/login');
    // mengisi username
    cy.get('input[placeholder="Email"]').type('dimas@gmail.com');

    // mengisi password
    cy.get('input[placeholder="Password"]').type('test123456');

    // menekan tombol Login
    cy.get('button').contains(/^Login$/).click();

    // memverifikasi bahwa elemen yang berada di homepage ditampilkan
    cy.get('div').contains(/^Diskusi Tersedia$/).should('be.visible');
  });
});
