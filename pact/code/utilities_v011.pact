;;
;; wallet smart contract
;; v0.11
;;---------------------------------------------------------------------------
;;
;; A smart contract model for real estate tokenization.
;;
;;---------------------------------------------------------------------------

;define keyset to guard the modules
(define-keyset 'admin-keyset (read-keyset "admin-keyset"))

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