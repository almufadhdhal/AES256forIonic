import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { AES256 } from '@ionic-native/aes-256';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	private secureKey: string;
	private secureIV: string;

	username:string;
    password:string;

	constructor(
		public navCtrl: NavController,
		public platform : Platform,
		private aes256: AES256
		) 
	{
		this.generateSecureKeyAndIV(); 
	}
	
	async generateSecureKeyAndIV() {
		this.secureKey = await this.aes256.generateSecureKey('random password 12345'); // Returns a 32 bytes string
		this.secureIV = await this.aes256.generateSecureIV('random password 12345'); // Returns a 16 bytes string
	}

	submit1() {
        this.aes256.encrypt('d52bd31fc8dc9c7229842a0e109b12bc', 'c86c3ad000602e39', this.username)
			.then(res => console.log('Encrypted Username: ',res))
			.catch((error: any) => console.error(error));
		console.log('hh : ',this.secureKey);
	}
	
	submit2() {
        this.aes256.decrypt('d52bd31fc8dc9c7229842a0e109b12bc', 'c86c3ad000602e39', 'NIO1VrwuqGyegcfqF/UcgQ==')
			.then(res => console.log('Decrypted Username: ',res))
			.catch((error: any) => console.error(error));
		console.log('hh : ',this.secureKey);
    }

	encrypt() {
		this.platform.ready().then(() => {
			this.aes256.encrypt(this.secureKey, this.secureIV, 'test')
			.then(res => console.log('Encrypted Data: ',res))
			.catch((error: any) => console.error(error));
		});
	}

	decrypt() {
		this.platform.ready().then(() => {
			this.aes256.decrypt(this.secureKey, this.secureIV, '82ZpAbttRo2Z/csbUxxykA==')
			.then(res => console.log('Decrypted Data : ',res))
			.catch((error: any) => console.error(error));
		});
	}

	generateSecureKey() {
		this.platform.ready().then(() => {
			this.aes256.generateSecureKey('random password 12345')
			.then(res => console.log('Secure Key : ',res))
			.catch((error: any) => console.error(error));
		});
	}

	generateSecureIV() {
		this.platform.ready().then(() => {
			this.aes256.generateSecureIV('random password 12345')
			.then(res => console.log('Secure IV : ',res))
			.catch((error: any) => console.error(error));
		});
	}

}
