;;
;; assettokenization smart contract
;; v0.09
;;---------------------------------------------------------------------------
;;
;; A smart contract model for real estate tokenizatation.
;;
;;---------------------------------------------------------------------------



;define keyset to guard the modules
(define-keyset 'ledger-keyset (read-keyset "admin-keyset"))
(define-keyset 'wallet-keyset (read-keyset "admin-keyset"))

;define the minimal smart-contract code needed on the ledger.
(module assettokenization 'ledger-keyset
 @doc " Smart contract module for assettokenization app.                        \
  \ Tables:                                                                     \
  \  * ownerships -- holds ownerships in the system.                            \
  \                                                                             \
  \ API Functions:                                                              \
  \  * create-ownership -- inserts a new ownership entry into ownerships table. \
  \  * transfer-token -- given source, destionation, asset id, and token id     \
  \    transfers a single token of a specific asset from source portfolio to    \
  \    a destination portfolio.                                                 "

 ;; The ownership schema and the table
 (defschema ownership
  assetid:string
  ntokens:integer
  keyset:keyset)
 (deftable ownerships:{ownership})

 ;;
 ;; API Functions
 ;;

 ;id:string assetid:string ntokens:integer keyset:keyset → string
 (defun create-ownership (id assetid ntokens keyset)
  @doc "Inserts a new ownership entry into ownerships table."
  (enforce-keyset 'ledger-keyset)
  (insert ownerships id
    {"assetid": assetid,
     "ntokens":ntokens,
     "keyset": keyset})
  (format "New ownership: id={}, assetid={}, quantity={}" [id assetid ntokens])
 )

 ;from:string to:string quantity:string → string
 (defun transfer-token (from to quantity)
  @doc "The function transfers tokens from an owner to another."

  (with-read ownerships from {"assetid":=from-assetid,
                              "ntokens":=from-ntokens,
                              "keyset":=from-keyset}

   (enforce-keyset from-keyset)
   (enforce (!= from to) "Self transactions are not allowed!")
   (enforce (>= from-ntokens quantity) "Insufficient tokens!")

   (update ownerships from
    {"ntokens": (- from-ntokens quantity)})

   (if
    (contains to (keys ownerships))
    (with-read ownerships to {"ntokens":=to-ntokens,
                              "assetid":=to-assetid,
                              "keyset":=to-keyset}
     (enforce-keyset to-keyset)
     (enforce (= from-assetid to-assetid) "Invalid transfer: asset mismatch!")
     (update ownerships to {"ntokens": (+ to-ntokens quantity)})
    )
    (create-ownership to from-assetid quantity (read-keyset "admin-keyset"))
   )
   (format "Transfer: from={}, to={},asset: {}, quantity={}"
    [from to from-assetid quantity])
  )
 )
)



;;
;; Wallet Functions
;;

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
  \ * get-history-asset -- given an asset id, lists all transactions of a       \
  \   given asset recorded on the ledger.                                       "

  ;id:string → list
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

 ;id:string → [<string>]
 (defun get-assets (key)
  @doc "Given a key (ownership id) returns corresponding assetid as a list with single element."
  (with-read ownerships key {"assetid":=assetid}
    [assetid])
 )

 ;key:[string] key2:[string] → [<string>]
 (defun fold-util-distinct-assets (key key2)
  @doc "Given a key and key2 returns processed string list."
  (if (contains (at 0 key2) key) key (+ key key2))
 )
 
 ;() → [string]
 (defun get-distinct-assets ()
  @doc "Returns distinct assetid list."
  (fold (fold-util-distinct-assets) [] (map (get-assets) (keys ownerships)))
 )

 ;id:string → {<string>:<string>, <string>:integer}
 (defun get-ntokens (key)
  @doc "Given a key (ownership id) returns number of tokens."
  {"ownerid":key,
   "ntokens": (at "ntokens" (read ownerships key))
  }
 )

 ;id:string → integer
 (defun get-assetid (key)
  @doc "Given a key (ownership id) returns the assetid."
  (at "assetid" (read ownerships key))
 )

 ;id:string → [<string>]
 (defun get-owners (assetid)
  @doc "Given an asset id, returns the list of owner ids (keys)."
  (filter
   (compose (get-assetid) (= assetid))
   (keys ownerships)
  )
 )

 ;id:string → [{<string>:<string>, <string>:integer}]
 (defun get-owners-distro (assetid)
  @doc "Given an asset id, returns the distribution of tokens."
   (map (get-ntokens) (get-owners assetid))
 )
)

;;
;; Examples and Tests
;;
;; Make sure that you have folloqing keysets exist in the environment:
;; * Ali-keyset
;; * Zeynep-keyset
;; * admin keyset(s) for the wallet and for the ledger


;instantiate ownerships table
(create-table ownerships)
