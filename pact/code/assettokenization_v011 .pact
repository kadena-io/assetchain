;;
;; assettokenization smart contract
;; v0.11
;;---------------------------------------------------------------------------
;;
;; A smart contract model for real estate tokenization.
;;
;;---------------------------------------------------------------------------

;define keyset to guard the modules
(define-keyset 'ledger-keyset (read-keyset "admin-keyset"))

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
     "keyset": (read-keyset keyset)})
  (format "New ownership: id={}, assetid={}, quantity={}"
   [id assetid ntokens])
 )

 ;from:string to:string quantity:string -> string
 (defun transfer-token (from to quantity)
  @doc "The function transfers tokens from an owner to another."
  
  (enforce (!= from to) "Self transactions are not allowed!")
  (enforce (> quantity 0) "Quantity must be postive!")

  (with-read ownerships from {"assetid":=from-assetid,
                              "ntokens":=from-ntokens,
                              "keyset":=from-keyset}

   (enforce-keyset from-keyset)
   (enforce (>= from-ntokens quantity) "Insufficient tokens!")

   (update ownerships from
    {"ntokens": (- from-ntokens quantity)})

    (with-default-read ownerships to {"ntokens":0,
                                      "assetid":from-assetid,
                                      "keyset":(read-keyset "admin-keyset")}
                                     {"ntokens":=to-ntokens,
                                      "assetid":=to-assetid,
                                      "keyset":=to-keyset}

     (enforce (= from-assetid to-assetid) "Invalid transfer: asset mismatch!")
     (write ownerships to {"assetid":to-assetid, 
                           "ntokens":(+ to-ntokens quantity), 
                           "keyset":to-keyset})
    )
   (format "Transfer: from={}, to={}, asset:{}, quantity={}"
    [from to from-assetid quantity])
   )

  )
)

;instantiate ownerships table
(create-table ownerships)