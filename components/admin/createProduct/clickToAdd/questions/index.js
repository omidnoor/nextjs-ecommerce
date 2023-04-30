import { useState } from "react";
import styles from "./styles.module.scss";
import { sizesList } from "@/data/sizes";
import { BsFillPatchMinusFill, BsFillPatchPlusFill } from "react-icons/bs";

export default function Questions({ questions, product, setProduct }) {
  const onQuestionsHandler = (e, index) => {
    const values = [...questions];
    values[index][e.target.name] = e.target.value;
    setProduct({ ...product, questions: values });
  };
  const onRemoveHandler = (index) => {
    if (questions.length > 0) {
      const values = [...questions];
      values.splice(index, 1);
      setProduct({ ...product, questions: values });
    }
  };
  console.log(product.questions);
  return (
    <div className={styles.questions}>
      <div className={styles.header}>Questions</div>
      {questions.length === 0 && (
        <BsFillPatchPlusFill
          onClick={() => {
            setProduct({
              ...product,
              questions: [
                ...questions,
                {
                  question: "",
                  answer: "",
                },
              ],
            });
          }}
        />
      )}

      {questions?.map((detail, index) => (
        <div className={styles.questions__container} key={index}>
          <input
            type="text"
            name="question"
            placeholder="Question"
            min={1}
            value={questions.name}
            onChange={(e) => onQuestionsHandler(e, index)}
          />
          <input
            type="text"
            name="answer"
            placeholder="Answer"
            min={1}
            value={questions.value}
            onChange={(e) => onQuestionsHandler(e, index)}
          />

          <>
            <BsFillPatchMinusFill onClick={() => onRemoveHandler(index)} />
            <BsFillPatchPlusFill
              onClick={() => {
                setProduct({
                  ...product,
                  questions: [
                    ...questions,
                    {
                      question: "",
                      answer: "",
                    },
                  ],
                });
              }}
            />
          </>
        </div>
      ))}
    </div>
  );
}
