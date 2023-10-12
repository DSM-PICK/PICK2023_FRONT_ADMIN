import { AddImgIcon } from "@/assets/bug-report";
import { FileInfoType } from "@/models/common";
import styled from "@emotion/styled";
import Image from "next/image";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

interface AddImgButtonProps {
  setFileInfo: React.Dispatch<React.SetStateAction<FileInfoType | undefined>>;
  fileInfo: FileInfoType;
}

const AddImgButton = ({ fileInfo, setFileInfo }: AddImgButtonProps) => {
  const fileInput = useRef<HTMLInputElement>(null);
  const [previewImg, setPreviewImg] = useState<string>("");
  const [upLoadFile, setUpLoadFile] = useState<File>();

  const onClickHandler = () => {
    fileInput.current!.click();
  };

  const imgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | null = e.target.files![0];

    if (file) {
      if (file.size > 10485760) {
        toast.error("파일 사이즈가 10MB를 넘으면 안 됩니다.", {
          duration: 1000,
        });
        return;
      }
      setUpLoadFile(file);
      const reader: FileReader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          const dataUrl = reader.result as string;
          setPreviewImg(dataUrl);

          setFileInfo({
            original_filename: file.name,
            content_type: file.type,
            file_size: file.size,
            file: file,
          });
        }
      };

      reader.readAsDataURL(file);
    } else {
      setUpLoadFile(upLoadFile);
      setPreviewImg(previewImg);
    }
  };

  return (
    <div>
      {previewImg ? (
        <SelectImg onClick={onClickHandler} src={previewImg as string} />
      ) : (
        <Container onClick={onClickHandler}>
          <Image src={AddImgIcon} alt="이미지 추가 버튼 " />
          <p>사진을 등록해주세요.</p>
        </Container>
      )}
      <input
        onChange={imgChange}
        type="file"
        accept="image/png"
        ref={fileInput}
        style={{ display: "none" }}
      />
    </div>
  );
};

const Container = styled.button`
  width: 445px;
  height: 230px;
  background: ${({ theme }) => theme.colors.gray300};
  border: none;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > p {
    color: ${({ theme }) => theme.colors.gray600};
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;
  }
`;

const SelectImg = styled.img`
  height: 230px;
  border-radius: 12px;
`;

export default AddImgButton;
