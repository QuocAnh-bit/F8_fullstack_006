-- Tạo bảng courses
CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL UNIQUE,
    price FLOAT UNIQUE,
	description TEXT,
    detail TEXT,
    teacher_id INT NOT NULL,
    active INT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);


-- Đổi tên 
ALTER TABLE courses
RENAME COLUMN detail TO content;

--Thay đổi rằng buộc
ALTER TABLE courses
ALTER COLUMN content SET NOT NULL;

-- Tạo bảng teacher
CREATE TABLE teacher (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL ,
    bio TEXT NULL UNIQUE,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- Thêm 3 giảng viên
INSERT INTO teacher (name, bio, created_at, updated_at)
VALUES 
('Hoàng an 1', 'https://hoangan1/bio', NOW(), NOW()),
('Hoàng an 2', 'https://hoangan2/bio', NOW(), NOW()),
('Hoàng an 3', 'https://hoangan3/bio', NOW(), NOW());

-- Thêm khóa học cho các giảng viên 

-- Hoàng an 1
INSERT INTO courses(name, description, content, teacher_id, active, created_at, updated_at, price)
VALUES 
('Khóa react 1', 'mô tả về react 1', 'nội dung về react 1', 1, 1, NOW(), NOW(), 5.5 ),
('Khóa react 2', 'mô tả về react 2', 'nội dung về react 2', 1, 1, NOW(), NOW(), 6.5 ),
('Khóa react 3', 'mô tả về react 3', 'nội dung về react 3', 1, 1, NOW(), NOW(), 7.5 );

-- Hoàng an 2
INSERT INTO courses(name, description, content, teacher_id, active, created_at, updated_at, price)
VALUES 
('Khóa react nâng cao 1', 'mô tả về react nâng cao 1', 'nội dung về react nâng cao 1', 2, 2, NOW(), NOW(), 5.6 ),
('Khóa react nâng cao 2', 'mô tả về react nâng cao 2', 'nội dung về react nâng cao 2', 2, 2, NOW(), NOW(), 6.6 ),
('Khóa react nâng cao 3', 'mô tả về react nâng cao 3', 'nội dung về react nâng cao 3', 2, 2, NOW(), NOW(), 7.6 );

-- Hoàng an 3
INSERT INTO courses(name, description, content, teacher_id, active, created_at, updated_at, price)
VALUES 
('Khóa nextjs nâng cao 1', 'mô tả về nextjs nâng cao 1', 'nội dung về nextjs nâng cao 1', 3, 3, NOW(), NOW(), 5.7 ),
('Khóa nextjs nâng cao 2', 'mô tả về nextjs nâng cao 2', 'nội dung về nextjs nâng cao 2', 3, 3, NOW(), NOW(), 6.7 ),
('Khóa nextjs nâng cao 3', 'mô tả về nextjs nâng cao 3', 'nội dung về nextjs nâng cao 3', 3, 3, NOW(), NOW(), 7.7 );


--Update tên khóa học và giá :
DO $$ 
DECLARE course_update RECORD;
BEGIN
    FOR course_update IN
        SELECT *
        FROM courses
        WHERE teacher_id IN (1, 2, 3)
    LOOP
       
        UPDATE courses
        SET
            name = course_update.name || ' mới',
            price = course_update.price * 1.1,
			updated_at = NOW()
        WHERE id = course_update.id;
    END LOOP;
END $$;
	

-- Update bio:
DO $$ 
DECLARE bio_update RECORD;
BEGIN
    FOR bio_update IN
        SELECT *
        FROM teacher
    LOOP
        UPDATE teacher
        SET
            bio = bio_update.bio || '/new',
			updated_at = NOW()
        WHERE id = bio_update.id;
    END LOOP;
END $$;

-- Hiển thị 2 bảng
-- SELECT * FROM public.courses
-- ORDER BY id ASC 

-- SELECT * FROM public.teacher

SELECT *
FROM teacher
JOIN courses ON teacher.id = courses.teacher_id;

