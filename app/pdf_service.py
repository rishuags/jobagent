from pypdf import PdfReader


def extract_text_from_pdf(file_object):
    reader = PdfReader(file_object)

    text_parts = []

    for page in reader.pages:
        page_text = page.extract_text()

        if page_text:
            text_parts.append(page_text)

    return "\n".join(text_parts)