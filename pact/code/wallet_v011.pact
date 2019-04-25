;;
;; Wallet functions smart contract
;; v0.11
;;---------------------------------------------------------------------------
;;
;; A smart contract model for real estate tokenization.
;;
;;---------------------------------------------------------------------------

;define keyset to guard the modules
(define-keyset 'wallet-keyset (read-keyset "admin-keyset"))

(module wallet 'wallet-keyset
 @doc " Smart contract module on the state of the ledger                        \
  \ Wallet Functions:                                                           \
  \                                                                             \
  \ These functions should be ideally implemented locally off-chain.            \
  \                                                                             \
  \ * check-ownerships -- given a an ownership key returns ownership data.      \
  \ * get-tokens -- given a key (ownership id) returns number of tokens.        \
  \ * get-assetid -- given a key (ownership id) returns the assetid             \
  \ * get-owners -- given an asset id, returns the list owners.                 \
  \ * get-owners-distro -- given an asset id, returns the distro of tokens as   \
  \   of its owners.                                                            \
  \ * get-assets -- returns a list of distinct assetids.                        "

  ;id:string -> list
  (defun check-ownership (key)
   @doc "Checks the quantity of a specific ownership."
   (with-read ownerships key {"assetid":=theasset,
                             "ntokens":=quantity,
                             "keyset":=keyset}
    (enforce-one "Access denied"
        [(enforce-keyset keyset)
         (enforce-keyset 'wallet-keyset)])
    [quantity theasset]
    )
  )

 ;id:string -> {string:string, string:integer}
 (defun get-ntokens (key)
  @doc "Given a key (ownership id) returns number of tokens."
  {"ownerid":key,
   "ntokens": (at "ntokens" (read ownerships key))
  }
 )

 ;id:string -> integer
 (defun get-assetid (key)
  @doc "Given a key (ownership id) returns the assetid."
   (if (check-owner-amount-gt-zero key)
       (at "assetid" (read ownerships key))
       "")
 )

 ;id:string -> integer
 (defun check-owner-amount-gt-zero (key)
  @doc "Given a key (ownership id) returns the assetid."
   (< 0 (at "ntokens" (read ownerships key)))
 )

 ;id:string -> [string]
 (defun get-owners (assetid)
  @doc "Given an asset id, returns the list of owner ids (keys)."
  (filter
   (compose (get-assetid) (= assetid))
   (keys ownerships)
  )
 )

 ;id:string -> [{string:string, string:integer}]
 (defun get-owners-distro (assetid)
  @doc "Given an asset id, returns the distribution of tokens."
   (map (get-ntokens) (get-owners assetid))
 )

 ;  -> [string]
 (defun get-assets()
  @doc "Returns distinct assetid list."
  (fold (insert-unique) [] (map (get-assetid) (keys ownerships)))
 )
)