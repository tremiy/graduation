

from gmssl import sm9

if __name__ == '__main__':
    idA = 'a'
    idB = 'b'

    print ("-----------------test sign and verify---------------")
    
    master_public, master_secret = sm9.setup ('sign')

    Da = sm9.private_key_extract ('sign', master_public, master_secret, idA)
    
    message = 'abc'
    signature = sm9.sign (master_public, Da, message)

    assert (sm9.verify (master_public, idA, message, signature))

    print ("\t\t\t success")

    print ("-----------------test key agreement---------------")
    
    master_public, master_secret = sm9.setup ('keyagreement')

    Da = sm9.private_key_extract ('keyagreement', master_public, master_secret, idA)
    Db = sm9.private_key_extract ('keyagreement', master_public, master_secret, idB)

    xa, Ra = sm9.generate_ephemeral (master_public, idB)
    xb, Rb = sm9.generate_ephemeral (master_public, idA)

    ska = sm9.generate_session_key (idA, idB, Ra, Rb, Da, xa, master_public, 'A', 128)
    skb = sm9.generate_session_key (idA, idB, Ra, Rb, Db, xb, master_public, 'B', 128)

    assert (ska == skb)

    print ("\t\t\t success")
    
    print ("-----------------test encrypt and decrypt---------------")

    master_public, master_secret = sm9.setup ('encrypt')

    Da = sm9.private_key_extract ('encrypt', master_public, master_secret, idA)

    message = 'abc'
    ct = sm9.kem_dem_enc (master_public, idA, message, 32)
    pt = sm9.kem_dem_dec (master_public, idA, Da, ct, 32)
    # pt1 = sm9.kem_dem_dec(master_public, idA, Da,(([12009492962060564059460758591034641064529450602164674148791922540191782226386, 19508442859021745506710004186548733386272373176683777314771963621103171983665],
    #                         [16394424838330575757899750274517855201564333374828907929751850906876508905806, 2669809851093673021878617109400654752343179070340891292608358608363350094649],
    #                         [2127314194720990601914570131080516527743151733720619137897773176300425819163, 13997508353687895756588962234739462279545069449649554624814287592966775380439]),
    #                        [2, 91, 6], 'e475'), 32)

    print(ct)
    # print(pt1)
    print((pt))
    assert (message == pt)

    print ("\t\t\t success")