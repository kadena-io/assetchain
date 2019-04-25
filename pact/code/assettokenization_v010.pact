;;
;; assettokenization smart contract
;; v0.10
;;---------------------------------------------------------------------------
;;
;; A smart contract model for real estate tokenization.
;;
;;---------------------------------------------------------------------------

;define keyset to guard the modules
(define-keyset 'admin-keyset (read-keyset "admin-keyset"))
(define-keyset 'ledger-keyset (read-keyset "admin-keyset"))
(define-keyset 'wallet-keyset (read-keyset "admin-keyset"))

;;
;; Utilities
;;

(module utilities 'admin-keyset
 @doc " The module contains custom Pact utilities.                              \
  \ Functions:                                                                  \
  \  * insert-unique -- Given an object and a list of objects inserts the object\
  \    into the list. The list is not altered if the object already exists.     "

 ;alist:[<x>] anobj:<x> -> [<x>]
 (defun insert-unique (alist anobj)
  @doc "Given an object and a list of objects inserts the object into the       \
   \ list. The list is not altered if the object already exists.                "
   (if (contains anobj alist) alist (+ alist [anobj]))
  )
)

;;
;; Smartcontract
;;
(module assettokenization 'ledger-keyset
 @doc " Smart contract module for assettokenization app.                        \
  \ Tables:                                                                     \
  \  * ownerships -- holds ownerships in the system.                            \
  \                                                                             \
  \ API Functions:                                                              \
  \  * create-ownership -- inserts a new ownership entry into ownerships table. \
  \  * transfer-token -- given source, destination, asset id, and token id     \
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

 ;id:string assetid:string ntokens:integer keyset:keyset -> string
 (defun create-ownership (id assetid ntokens keyset)
  @doc "Inserts a new ownership entry into ownerships table."
  (enforce-keyset 'ledger-keyset)
  (insert ownerships id
    {"assetid": assetid,
     "ntokens":ntokens,
     "keyset": keyset})
  (format "New ownership: id={}, assetid={}, quantity={}"
   [id assetid ntokens])
 )

 ;from:string to:string quantity:string -> string
 (defun transfer-token (from to quantity)
  @doc "The function transfers tokens from an owner to another."
  (with-read ownerships from {"assetid":=from-assetid,
                              "ntokens":=from-ntokens,
                              "keyset":=from-keyset}

   (enforce-keyset from-keyset)
   (enforce (!= from to) "Self transactions are not allowed!")
   (enforce (> quantity 0) "Quantity must be postive!")
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
   (format "Transfer: from={}, to={}, asset:{}, quantity={}"
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
   (at "assetid" (read ownerships key))
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

;instantiate ownerships table
(create-table ownerships)

