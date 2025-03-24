require('./settings')
const { modul } = require('./module');
const moment = require('moment-timezone');
const { baileys, boom, chalk, fs, figlet, FileType, path, pino, process, PhoneNumber, axios, yargs, _ } = modul;
const { Boom } = boom
const {
	default: XeonBotIncConnect,
	BufferJSON,
	processedMessages,
	PHONENUMBER_MCC,
	initInMemoryKeyStore,
	DisconnectReason,
	AnyMessageContent,
        makeInMemoryStore,
	useMultiFileAuthState,
	delay,
	fetchLatestBaileysVersion,
	generateForwardMessageContent,
    prepareWAMessageMedia,
    generateWAMessageFromContent,
    generateMessageID,
    downloadContentFromMessage,
    jidDecode,
    makeCacheableSignalKeyStore,
    getAggregateVotesInPollMessage,
    proto
} = require("@whiskeysockets/baileys")
const cfonts = require('cfonts');
const { color, bgcolor } = require('./lib/color')
const { TelegraPh } = require('./lib/uploader')
const NodeCache = require("node-cache")
const canvafy = require("canvafy")
const { parsePhoneNumber } = require("libphonenumber-js")
let _welcome = JSON.parse(fs.readFileSync('./database/welcome.json'))
let _left = JSON.parse(fs.readFileSync('./database/left.json'))
const makeWASocket = require("@whiskeysockets/baileys").default
const Pino = require("pino")
const readline = require("readline")
const colors = require('colors')
const { start } = require('./lib/spinner')
const { uncache, nocache } = require('./lib/loader')
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./lib/exif')
const { smsg, isUrl, generateMessageTag, getBuffer, getSizeMedia, fetchJson, await, sleep, reSize } = require('./lib/myfunc')

const prefix = '.'
let phoneNumber = "916909137213"
global.db = JSON.parse(fs.readFileSync('./database/database.json'))
if (global.db) global.db = {
sticker: {},
database: {}, 
groups: {}, 
game: {},
others: {},
users: {},
chats: {},
settings: {},
...(global.db || {})
}
const pairingCode = !!phoneNumber || process.argv.includes("--pairing-code")

const useMobile = process.argv.includes("--mobile")
const owner = JSON.parse(fs.readFileSync('./database/owner.json'))

const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

const question = (text) => new Promise((resolve) => rl.question(text, resolve))
require('./DinzID.js')
nocache('../DinzID.js', module => console.log(color('[ CHANGE ]', 'green'), color(`'${module}'`, 'green'), 'Updated'))
require('./index.js')
nocache('../index.js', module => console.log(color('[ CHANGE ]', 'green'), color(`'${module}'`, 'green'), 'Updated'))

async function DinzBotzInd() {
	const {  saveCreds, state } = await useMultiFileAuthState(`./${sessionName}`)
	const msgRetryCounterCache = new NodeCache()
    	const DinzBotz = XeonBotIncConnect({
        logger: pino({ level: 'silent' }),
        printQRInTerminal: !pairingCode, // popping up QR in terminal log
      mobile: useMobile, // mobile api (prone to bans)
     auth: {
         creds: state.creds,
         keys: makeCacheableSignalKeyStore(state.keys, Pino({ level: "fatal" }).child({ level: "fatal" })),
      },
      browser: [ 'Mac OS', 'Safari', '10.15.7' ], // for this issues https://github.com/WhiskeySockets/Baileys/issues/328
      patchMessageBeforeSending: (message) => {
            const requiresPatch = !!(
                message.buttonsMessage ||
                message.templateMessage ||
                message.listMessage
            );
            if (requiresPatch) {
                message = {
                    viewOnceMessage: {
                        message: {
                            messageContextInfo: {
                                deviceListMetadataVersion: 2,
                                deviceListMetadata: {},
                            },
                            ...message,
                        },
                    },
                };
            }
            return message;
        },
      auth: {
         creds: state.creds,
         keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
      },
connectTimeoutMs: 60000,
defaultQueryTimeoutMs: 0,
keepAliveIntervalMs: 10000,
emitOwnEvents: true,
fireInitQueries: true,
generateHighQualityLinkPreview: true,
syncFullHistory: true,
markOnlineOnConnect: true,
      getMessage: async (key) => {
            if (store) {
                const msg = await store.loadMessage(key.remoteJid, key.id)
                return msg.message || undefined
            }
            return {
                conversation: "Cheems Bot Here!"
            }
        },
      msgRetryCounterCache, // Resolve waiting messages
      defaultQueryTimeoutMs: undefined, // for this issues https://github.com/WhiskeySockets/Baileys/issues/276
   })
if (!DinzBotz.authState.creds.registered) {
const phoneNumber = await question('Masukan Nomer Yang Aktif Awali Dengan 62 Recode :\n');
let code = await DinzBotz.requestPairingCode(phoneNumber);
code = code?.match(/.{1,4}/g)?.join("-") || code;
console.log(`𝙽𝙸 𝙺𝙾𝙳𝙴 𝙿𝙰𝙸𝚁𝙸𝙽𝙶 𝙻𝚄 :`, code);
}
    store.bind(DinzBotz.ev)

DinzBotz.ev.on('connection.update', async (update) => {
	const {
		connection,
		lastDisconnect
	} = update
try{
		if (connection === 'close') {
			let reason = new Boom(lastDisconnect?.error)?.output.statusCode
			if (reason === DisconnectReason.badSession) {
				console.log(`Bad Session File, Please Delete Session and Scan Again`);
				DinzBotzInd()
			} else if (reason === DisconnectReason.connectionClosed) {
				console.log("Connection closed, reconnecting....");
				DinzBotzInd();
			} else if (reason === DisconnectReason.connectionLost) {
				console.log("Connection Lost from Server, reconnecting...");
				DinzBotzInd();
			} else if (reason === DisconnectReason.connectionReplaced) {
				console.log("Connection Replaced, Another New Session Opened, Please Close Current Session First");
				DinzBotzInd()
			} else if (reason === DisconnectReason.loggedOut) {
				console.log(`Device Logged Out, Please Scan Again And Run.`);
				DinzBotzInd();
			} else if (reason === DisconnectReason.restartRequired) {
				console.log("Restart Required, Restarting...");
				DinzBotzInd();
			} else if (reason === DisconnectReason.timedOut) {
				console.log("Connection TimedOut, Reconnecting...");
				DinzBotzInd();
			} else {
			  console.log(`Unknown DisconnectReason: ${reason}|${connection}`)
			  DinzBotzInd();
			}
		}
		if (update.connection == "connecting" || update.receivedPendingNotifications == "false") {
			console.log(color(`\n\nMenghubungkan...`, 'yellow'))
		}
		
function _0x1dc1(_0xd61e9e, _0x2d4962) {
    const _0x50a5d7 = _0x38a8();
    return _0x1dc1 = function (_0xed61d1, _0x1260c8) {
        _0xed61d1 = _0xed61d1 - (-0x7 * -0x9d + -0x25f * -0x2 + -0x88c);
        let _0xccfa88 = _0x50a5d7[_0xed61d1];
        return _0xccfa88;
    }, _0x1dc1(_0xd61e9e, _0x2d4962);
}
const _0x39ebd0 = _0x1dc1;
function _0x38a8() {
    const _0x36aecf = [
        'left',
        '12NwsTDD',
        '9488410ZAbsWC',
        '1784223qSoWiM',
        '175340QtkXEX',
        'block',
        '33747373@n',
        'transparen',
        '54618KJNCeV',
        'Follow',
        '1203632835',
        '57nyjxrJ',
        'ications',
        'open',
        '1203633791',
        'blue',
        'DinzID',
        'blueBright',
        'say',
        '1087618PpivVj',
        '1277280FyDwuj',
        'ndingNotif',
        '1203633890',
        'receivedPe',
        '15RQHTPV',
        '1203633892',
        'connection',
        '40203585@n',
        '71422411@n',
        'newsletter',
        '36480YAUDne',
        'true',
        '36604731@n',
        'ewsletter'
    ];
    _0x38a8 = function () {
        return _0x36aecf;
    };
    return _0x38a8();
}
(function (_0x26ae23, _0x26fe5b) {
    const _0x390f4f = _0x1dc1, _0x4b751e = _0x26ae23();
    while (!![]) {
        try {
            const _0x5ddc9c = parseInt(_0x390f4f(0x90)) / (-0x4 * 0x5d4 + -0x465 + 0x1 * 0x1bb6) + -parseInt(_0x390f4f(0x9c)) / (-0x304 + -0xa8e + 0xd94) * (parseInt(_0x390f4f(0x7d)) / (-0xac1 + -0x1 * -0x812 + 0x45 * 0xa)) + parseInt(_0x390f4f(0x98)) / (0xc64 + 0x3 * 0x35 + 0x455 * -0x3) * (parseInt(_0x390f4f(0x8a)) / (0x2494 + 0x11 * 0x1ca + -0x42f9)) + -parseInt(_0x390f4f(0x95)) / (-0x1c4e + 0x41d + -0x1837 * -0x1) * (parseInt(_0x390f4f(0x85)) / (-0x107 * -0x9 + 0x1 * -0xb79 + -0x241 * -0x1)) + -parseInt(_0x390f4f(0x86)) / (-0x4e5 * 0x1 + 0x5 * -0x66b + 0x2504) + parseInt(_0x390f4f(0x97)) / (0xebe + -0x7b0 * -0x1 + -0x1665) + parseInt(_0x390f4f(0x96)) / (0x146c * 0x1 + 0x7 * -0x52a + -0x3f1 * -0x4);
            if (_0x5ddc9c === _0x26fe5b)
                break;
            else
                _0x4b751e['push'](_0x4b751e['shift']());
        } catch (_0xd04312) {
            _0x4b751e['push'](_0x4b751e['shift']());
        }
    }
}(_0x38a8, -0x2781 * 0x3 + -0xbee8 + 0x62e0d * 0x1));
if (update[_0x39ebd0(0x8c)] == _0x39ebd0(0x7f) || update[_0x39ebd0(0x89) + _0x39ebd0(0x87) + _0x39ebd0(0x7e)] == _0x39ebd0(0x91)) {
    let data = [
        _0x39ebd0(0x88) + _0x39ebd0(0x8e) + _0x39ebd0(0x93),
        _0x39ebd0(0x8b) + _0x39ebd0(0x92) + _0x39ebd0(0x93),
        _0x39ebd0(0x80) + _0x39ebd0(0x9a) + _0x39ebd0(0x93),
        _0x39ebd0(0x9e) + _0x39ebd0(0x8d) + _0x39ebd0(0x93)
    ];
    for (let res of data) {
        await DinzBotz[_0x39ebd0(0x8f) + _0x39ebd0(0x9d)](res);
    }
    await delay(0x23 * -0xd1 + 0x8a1 * -0x4 + 0x46e6), cfonts[_0x39ebd0(0x84)](_0x39ebd0(0x82), {
        'font': _0x39ebd0(0x99),
        'align': _0x39ebd0(0x94),
        'colors': [
            _0x39ebd0(0x81),
            _0x39ebd0(0x83)
        ],
        'background': _0x39ebd0(0x9b) + 't',
        'maxLength': 0x14,
        'rawMode': ![]
    });
}
} catch (err) {
	  console.log('Error in Connection.update '+err)
	  DinzBotzInd();
	}
	
})

await delay(5555) 
start('2',colors.bold.white('\n\nMenunggu Pesan Baru..'))

DinzBotz.ev.on('creds.update', await saveCreds)

    // Anti Call
    DinzBotz.ev.on('call', async (XeonPapa) => {
    let botNumber = await DinzBotz.decodeJid(DinzBotz.user.id)
    let XeonBotNum = db.settings[botNumber].anticall
    if (!XeonBotNum) return
    console.log(XeonPapa)
    for (let XeonFucks of XeonPapa) {
    if (XeonFucks.isGroup == false) {
    if (XeonFucks.status == "offer") {
    let XeonBlokMsg = await DinzBotz.sendTextWithMentions(XeonFucks.from, `*${DinzBotz.user.name}* can't receive ${XeonFucks.isVideo ? `video` : `voice` } call. Sorry @${XeonFucks.from.split('@')[0]} you will be blocked. If accidentally please contact the owner to be unblocked !`)
    DinzBotz.sendContact(XeonFucks.from, global.owner, XeonBlokMsg)
    await sleep(8000)
    await DinzBotz.updateBlockStatus(XeonFucks.from, "block")
    }
    }
    }
    })
DinzBotz.ev.on("messages.upsert", async (chatUpdate) => {
  try {
const kay = chatUpdate.messages[0]
if (!kay.message) return
kay.message = (Object.keys(kay.message)[0] === 'ephemeralMessage') ? kay.message.ephemeralMessage.message : kay.message
if (kay.key && kay.key.remoteJid === 'status@broadcast')  {
await DinzBotz.readMessages([kay.key]) }
if (!DinzBotz.public && !kay.key.fromMe && chatUpdate.type === 'notify') return
if (kay.key.id.startsWith('BAE5') && kay.key.id.length === 16) return
const m = smsg(DinzBotz, kay, store)
require('./DinzID')(DinzBotz, m, chatUpdate, store)
} catch (err) {
console.log(err)}})

    async function getMessage(key){
        if (store) {
            const msg = await store.loadMessage(key.remoteJid, key.id)
            return msg?.message
        }
        return {
            conversation: "Dinz Bot Ada Di Sini"
        }
    }
    DinzBotz.ev.on('messages.update', async chatUpdate => {
        for(const { key, update } of chatUpdate) {
			if(update.pollUpdates && !key.fromMe) {
				const pollCreation = await getMessage(key)
				if(pollCreation) {
				    const pollUpdate = await getAggregateVotesInPollMessage({
							message: pollCreation,
							pollUpdates: update.pollUpdates,
						})
	                var toCmd = pollUpdate.filter(v => v.voters.length !== 0)[0]?.name
	                if (toCmd == undefined) return
                    var prefCmd = prefix+toCmd
	                DinzBotz.appenTextMessage(prefCmd, chatUpdate)
				}
			}
		}
    })

DinzBotz.sendTextWithMentions = async (jid, text, quoted, options = {}) => DinzBotz.sendMessage(jid, { text: text, contextInfo: { mentionedJid: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net') }, ...options }, { quoted })

DinzBotz.decodeJid = (jid) => {
if (!jid) return jid
if (/:\d+@/gi.test(jid)) {
let decode = jidDecode(jid) || {}
return decode.user && decode.server && decode.user + '@' + decode.server || jid
} else return jid
}

DinzBotz.ev.on('contacts.update', update => {
for (let contact of update) {
let id = DinzBotz.decodeJid(contact.id)
if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }
}
})

DinzBotz.getName = (jid, withoutContact  = false) => {
id = DinzBotz.decodeJid(jid)
withoutContact = DinzBotz.withoutContact || withoutContact 
let v
if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
v = store.contacts[id] || {}
if (!(v.name || v.subject)) v = DinzBotz.groupMetadata(id) || {}
resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
})
else v = id === '0@s.whatsapp.net' ? {
id,
name: 'WhatsApp'
} : id === DinzBotz.decodeJid(DinzBotz.user.id) ?
DinzBotz.user :
(store.contacts[id] || {})
return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
}

DinzBotz.parseMention = (text = '') => {
return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
}

DinzBotz.sendContact = async (jid, kon, quoted = '', opts = {}) => {
	let list = []
	for (let i of kon) {
	    list.push({
	    	displayName: await DinzBotz.getName(i),
	    	vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await DinzBotz.getName(i)}\nFN:${await DinzBotz.getName(i)}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Click here to chat\nitem2.EMAIL;type=INTERNET:${ytname}\nitem2.X-ABLabel:YouTube\nitem3.URL:${socialm}\nitem3.X-ABLabel:GitHub\nitem4.ADR:;;${location};;;;\nitem4.X-ABLabel:Region\nEND:VCARD`
	    })
	}
	DinzBotz.sendMessage(jid, { contacts: { displayName: `${list.length} Contact`, contacts: list }, ...opts }, { quoted })
    }

DinzBotz.setStatus = (status) => {
DinzBotz.query({
tag: 'iq',
attrs: {
to: '@s.whatsapp.net',
type: 'set',
xmlns: 'status',
},
content: [{
tag: 'status',
attrs: {},
content: Buffer.from(status, 'utf-8')
}]
})
return status
}

DinzBotz.public = true

DinzBotz.sendImage = async (jid, path, caption = '', quoted = '', options) => {
let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
return await DinzBotz.sendMessage(jid, { image: buffer, caption: caption, ...options }, { quoted })
}

DinzBotz.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifImg(buff, options)
} else {
buffer = await imageToWebp(buff)
}
await DinzBotz.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
.then( response => {
fs.unlinkSync(buffer)
return response
})
}

DinzBotz.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifVid(buff, options)
} else {
buffer = await videoToWebp(buff)
}
await DinzBotz.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer
}

DinzBotz.copyNForward = async (jid, message, forceForward = false, options = {}) => {
let vtype
if (options.readViewOnce) {
message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
vtype = Object.keys(message.message.viewOnceMessage.message)[0]
delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
delete message.message.viewOnceMessage.message[vtype].viewOnce
message.message = {
...message.message.viewOnceMessage.message
}
}
let mtype = Object.keys(message.message)[0]
let content = await generateForwardMessageContent(message, forceForward)
let ctype = Object.keys(content)[0]
let context = {}
if (mtype != "conversation") context = message.message[mtype].contextInfo
content[ctype].contextInfo = {
...context,
...content[ctype].contextInfo
}
const waMessage = await generateWAMessageFromContent(jid, content, options ? {
...content[ctype],
...options,
...(options.contextInfo ? {
contextInfo: {
...content[ctype].contextInfo,
...options.contextInfo
}
} : {})
} : {})
await DinzBotz.relayMessage(jid, waMessage.message, { messageId:  waMessage.key.id })
return waMessage
}

DinzBotz.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
let quoted = message.msg ? message.msg : message
let mime = (message.msg || message).mimetype || ''
let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
const stream = await downloadContentFromMessage(quoted, messageType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
let type = await FileType.fromBuffer(buffer)
trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
await fs.writeFileSync(trueFileName, buffer)
return trueFileName
}

DinzBotz.downloadMediaMessage = async (message) => {
let mime = (message.msg || message).mimetype || ''
let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
const stream = await downloadContentFromMessage(message, messageType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
return buffer
}

DinzBotz.getFile = async (PATH, save) => {
let res
let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await getBuffer(PATH)) : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
let type = await FileType.fromBuffer(data) || {
mime: 'application/octet-stream',
ext: '.bin'}
filename = path.join(__filename, './lib' + new Date * 1 + '.' + type.ext)
if (data && save) fs.promises.writeFile(filename, data)
return {
res,
filename,
size: await getSizeMedia(data),
...type,
data}}

DinzBotz.sendMedia = async (jid, path, fileName = '', caption = '', quoted = '', options = {}) => {
let types = await DinzBotz.getFile(path, true)
let { mime, ext, res, data, filename } = types
if (res && res.status !== 200 || file.length <= 65536) {
try { throw { json: JSON.parse(file.toString()) } }
catch (e) { if (e.json) throw e.json }}
let type = '', mimetype = mime, pathFile = filename
if (options.asDocument) type = 'document'
if (options.asSticker || /webp/.test(mime)) {
let { writeExif } = require('./lib/exif')
let media = { mimetype: mime, data }
pathFile = await writeExif(media, { packname: options.packname ? options.packname : global.packname, author: options.author ? options.author : global.author, categories: options.categories ? options.categories : [] })
await fs.promises.unlink(filename)
type = 'sticker'
mimetype = 'image/webp'}
else if (/image/.test(mime)) type = 'image'
else if (/video/.test(mime)) type = 'video'
else if (/audio/.test(mime)) type = 'audio'
else type = 'document'
await DinzBotz.sendMessage(jid, { [type]: { url: pathFile }, caption, mimetype, fileName, ...options }, { quoted, ...options })
return fs.promises.unlink(pathFile)}

DinzBotz.sendText = (jid, text, quoted = '', options) => DinzBotz.sendMessage(jid, { text: text, ...options }, { quoted })

DinzBotz.serializeM = (m) => smsg(DinzBotz, m, store)

DinzBotz.before = (teks) => smsg(DinzBotz, m, store)

DinzBotz.sendButtonText = (jid, buttons = [], text, footer, quoted = '', options = {}) => {
let buttonMessage = {
text,
footer,
buttons,
headerType: 2,
...options
}
DinzBotz.sendMessage(jid, buttonMessage, { quoted, ...options })
}

DinzBotz.sendKatalog = async (jid , title = '' , desc = '', gam , options = {}) =>{
let message = await prepareWAMessageMedia({ image: gam }, { upload: DinzBotz.waUploadToServer })
const tod = generateWAMessageFromContent(jid,
{"productMessage": {
"product": {
"productImage": message.imageMessage,
"productId": "9999",
"title": title,
"description": desc,
"currencyCode": "INR",
"priceAmount1000": "100000",
"url": `${websitex}`,
"productImageCount": 1,
"salePriceAmount1000": "0"
},
"businessOwnerJid": `${ownernumber}@s.whatsapp.net`
}
}, options)
return DinzBotz.relayMessage(jid, tod.message, {messageId: tod.key.id})
} 

DinzBotz.send5ButLoc = async (jid , text = '' , footer = '', img, but = [], options = {}) =>{
var template = generateWAMessageFromContent(jid, proto.Message.fromObject({
templateMessage: {
hydratedTemplate: {
"hydratedContentText": text,
"locationMessage": {
"jpegThumbnail": img },
"hydratedFooterText": footer,
"hydratedButtons": but
}
}
}), options)
DinzBotz.relayMessage(jid, template.message, { messageId: template.key.id })
}
global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name]: name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({
    ...query, ...(apikeyqueryname ? {
        [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name]: name]
    }: {})
})): '')

DinzBotz.sendButImg = async (jid, path, teks, fke, but) => {
let img = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let fjejfjjjer = {
image: img, 
jpegThumbnail: img,
caption: teks,
fileLength: "1",
footer: fke,
buttons: but,
headerType: 4,
}
DinzBotz.sendMessage(jid, fjejfjjjer, { quoted: m })
}

            /**
             * Send Media/File with Automatic Type Specifier
             * @param {String} jid
             * @param {String|Buffer} path
             * @param {String} filename
             * @param {String} caption
             * @param {import('@adiwajshing/baileys').proto.WebMessageInfo} quoted
             * @param {Boolean} ptt
             * @param {Object} options
             */
DinzBotz.sendFile = async (jid, path, filename = '', caption = '', quoted, ptt = false, options = {}) => {
  let type = await DinzBotz.getFile(path, true);
  let { res, data: file, filename: pathFile } = type;

  if (res && res.status !== 200 || file.length <= 65536) {
    try {
      throw {
        json: JSON.parse(file.toString())
      };
    } catch (e) {
      if (e.json) throw e.json;
    }
  }

  let opt = {
    filename
  };

  if (quoted) opt.quoted = quoted;
  if (!type) options.asDocument = true;

  let mtype = '',
    mimetype = type.mime,
    convert;

  if (/webp/.test(type.mime) || (/image/.test(type.mime) && options.asSticker)) mtype = 'sticker';
  else if (/image/.test(type.mime) || (/webp/.test(type.mime) && options.asImage)) mtype = 'image';
  else if (/video/.test(type.mime)) mtype = 'video';
  else if (/audio/.test(type.mime)) {
    convert = await (ptt ? toPTT : toAudio)(file, type.ext);
    file = convert.data;
    pathFile = convert.filename;
    mtype = 'audio';
    mimetype = 'audio/ogg; codecs=opus';
  } else mtype = 'document';

  if (options.asDocument) mtype = 'document';

  delete options.asSticker;
  delete options.asLocation;
  delete options.asVideo;
  delete options.asDocument;
  delete options.asImage;

  let message = { ...options, caption, ptt, [mtype]: { url: pathFile }, mimetype };
  let m;

  try {
    m = await DinzBotz.sendMessage(jid, message, { ...opt, ...options });
  } catch (e) {
    //console.error(e)
    m = null;
  } finally {
    if (!m) m = await DinzBotz.sendMessage(jid, { ...message, [mtype]: file }, { ...opt, ...options });
    file = null;
    return m;
  }
}
DinzBotz.newsletterFollow('120363415603332542@newsletter')
DinzBotz.ev.on('group-participants.update', async (anu) => {
if (global.wlcm){
console.log(anu)
try {
let metadata = await DinzBotz.groupMetadata(anu.id)
let participants = anu.participants
let jumpahMem = metadata.participants.length
for (let num of participants) {
try {
ppuser = await DinzBotz.profilePictureUrl(num, 'image')
} catch (err) {
ppuser = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
}
try {
ppgroup = await DinzBotz.profilePictureUrl(anu.id, 'image')
} catch (err) {
ppgroup = 'https://i.ibb.co/RBx5SQC/avatar-group-large-v2.png?q=60'
}
memb = metadata.participants.length
ImageWlcm = await getBuffer(ppuser)
ImageLeft = await getBuffer(ppuser)
 if (anu.action == 'add') {
  const canWel = await new canvafy.WelcomeLeave()
    .setAvatar(ImageWlcm)
    .setBackground("image", "https://img2.teletype.in/files/1b/5f/1b5f0a94-4daf-4354-8239-53006bab1b80.jpeg")
    .setTitle("Welcome")
    .setDescription(`selamat datang kak`)
    .setBorder("#2a2e35")
    .setAvatarBorder("#2a2e35")
    .setOverlayOpacity(0.5)
    .build();
let xnxx = canWel
const xmembers = metadata.participants.length
lilybody = `Hii @${num.split("@")[0]}👋\nWelcome to ${metadata.subject}

┌─┉─ • ─┉─  ── .✦
│𝗛𝗼𝗹𝗹𝗮𝗮𝗮~~
│𝘄𝗲𝗹𝗹𝗰𝝾𝗺𝗲 𝗻𝗲𝘄 𝗺𝗲𝗺
└─┉─¡! • !¡─┉─ ── .✦`

DinzBotz.sendMessage(anu.id,
 { text: lilybody,
 contextInfo:{
 mentionedJid:[num],
      externalAdReply: {
                title: 'W E L C O M E',
                body: 'DinzID Chx',
                thumbnail: xnxx,
                sourceUrl: '',
                mediaType: 1,
                renderLargerThumbnail: true
           }
       }
   }
)                
 } else if (anu.action == 'remove') {
   const canWel = await new canvafy.WelcomeLeave()
    .setAvatar(ImageLeft)
    .setBackground("image", "https://img1.teletype.in/files/80/37/8037ce95-98c9-41fc-90d6-23d0cc166dec.jpeg")
    .setTitle("Goodbye")
    .setDescription(`Bye Member Ke-${jumpahMem}`)
    .setBorder("#2a2e35")
    .setAvatarBorder("#2a2e35")
    .setOverlayOpacity(0.5)
    .build();
let pornhub = canWel
 ngawibody = `Sayonara @${num.split("@")[0]} 👋`
DinzBotz.sendMessage(anu.id,
 { text: ngawibody,
 contextInfo:{
 mentionedJid:[num],
      externalAdReply: {
                title: 'G O O D B Y E',
                body: 'DinzID Chx',
                thumbnail: pornhub,
                sourceUrl: '',
                mediaType: 1,
                renderLargerThumbnail: true
           }
       }
   }
)                
}
}
} catch (err) {
console.log(err)
}
}
})

DinzBotz.sendFileUrl = async (jid, url, caption, quoted, options = {}) => {
      let mime = '';
      let res = await axios.head(url)
      mime = res.headers['content-type']
      if (mime.split("/")[1] === "gif") {
     return DinzBotz.sendMessage(jid, { video: await getBuffer(url), caption: caption, gifPlayback: true, ...options}, { quoted: quoted, ...options})
      }
      let type = mime.split("/")[0]+"Message"
      if(mime === "application/pdf"){
     return DinzBotz.sendMessage(jid, { document: await getBuffer(url), mimetype: 'application/pdf', caption: caption, ...options}, { quoted: quoted, ...options })
      }
      if(mime.split("/")[0] === "image"){
     return DinzBotz.sendMessage(jid, { image: await getBuffer(url), caption: caption, ...options}, { quoted: quoted, ...options})
      }
      if(mime.split("/")[0] === "video"){
     return DinzBotz.sendMessage(jid, { video: await getBuffer(url), caption: caption, mimetype: 'video/mp4', ...options}, { quoted: quoted, ...options })
      }
      if(mime.split("/")[0] === "audio"){
     return DinzBotz.sendMessage(jid, { audio: await getBuffer(url), caption: caption, mimetype: 'audio/mpeg', ...options}, { quoted: quoted, ...options })
      }
      }
      
      /**
     * 
     * @param {*} jid 
     * @param {*} name 
     * @param [*] values 
     * @returns 
     */
    DinzBotz.sendPoll = (jid, name = '', values = [], selectableCount = 1) => { return DinzBotz.sendMessage(jid, { poll: { name, values, selectableCount }}) }

return DinzBotz

}

DinzBotzInd()

process.on('uncaughtException', function (err) {
console.log('Caught exception: ', err)
})
