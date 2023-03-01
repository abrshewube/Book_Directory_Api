const router=require('express').Router()
const books=require('./books')
let book_list=books;
router.get('/books',(req,res)=>{
 res.send(book_list)
})
router.get('/books/:id', (req, res) =>{
    const { id } = req.params;

    const book = book_list.find(b => b.isbn === id);
    if (!book) return res.status(404).send('Book does not exist');

    res.send(book);
});

router.post('/books',(req,res)=>{
    const {
        title,
        isbn,
        pageCount,
        publishedDate,
        thumbnailUrl,
        shortDescription,
        longDescription,
        status,
        authors,
        categories
    } = req.body;

    const bookExist = book_list.find(b => b.isbn === isbn);
    if (bookExist) return res.send('Book already exist');

    const book = {
        title,
        isbn,
        pageCount,
        publishedDate,
        thumbnailUrl,
        shortDescription,
        longDescription,
        status,
        authors,
        categories
    };
    book_list.push(book);

    res.send(book);
})
router.put('/books:id',(req,res)=>{
    const { id } = req.params;
    const {
        title,
        isbn,
        pageCount,
        publishedDate,
        thumbnailUrl,
        shortDescription,
        longDescription,
        status,
        authors,
        categories
    } = req.body;

    let book = book_list.find(b => b.isbn === id);
    if (!book) return res.status(404).send('Book does not exist');

    const updateField = (val, prev) => !val ? prev : val;

    const updatedBook = {
        ...book,
        title: updateField(title, book.title),
        isbn: updateField(isbn, book.isbn),
        pageCount: updateField(pageCount, book.pageCount),
        publishedDate: updateField(publishedDate, book.publishedDate),
        thumbnailUrl: updateField(thumbnailUrl, book.thumbnailUrl),
        shortDescription: updateField(shortDescription, book.shortDescription),
        longDescription: updateField(longDescription, book.longDescription),
        status: updateField(status, book.status),
        authors: updateField(authors, book.authors),
        categories: updateField(categories, book.categories),
    };

    const bookIndex = book_list.findIndex(b => b.isbn === book.isbn);
    book_list.splice(bookIndex, 1, updatedBook);

    res.status(200).send(updatedBook);
})
router.delete('/books',(req,res)=>{
    const { id } = req.params;

    let book = book_list.find(b => b.isbn === id);
    if (!book) return res.status(404).send('Book does not exist');

    book_list = book_list.filter(b => b.isbn !== id);

    res.send('Success');
})


module.exports=router