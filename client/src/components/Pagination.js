import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="pagination-container">
            <button 
                className={`pagination-button ${currentPage === 1 ? 'disabled' : ''}`}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                &lt;
            </button>

            {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;
                if (
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    (pageNumber >= currentPage - 2 && pageNumber <= currentPage + 2)
                ) {
                    return (
                        <button
                            key={index}
                            className={`pagination-button ${currentPage === pageNumber ? 'active' : ''}`}
                            onClick={() => onPageChange(pageNumber)}
                        >
                            {pageNumber}
                        </button>
                    );
                } else if (
                    pageNumber === currentPage - 3 ||
                    pageNumber === currentPage + 3
                ) {
                    return <span key={index} className="pagination-ellipsis">...</span>;
                }
                return null;
            })}

            <button
                className={`pagination-button ${currentPage === totalPages ? 'disabled' : ''}`}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                &gt;
            </button>
        </div>
    );
};

export default Pagination; 