'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FaGithub, FaLink } from 'react-icons/fa'
import { motion } from 'framer-motion'

type ProjectCardProps = {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  repoLink?: string | null
  webLink?: string | null
  tags?: string[]
}

export default function ProjectCard({
  title,
  description,
  imageSrc,
  imageAlt,
  repoLink,
  webLink,
  tags,
}: ProjectCardProps) {
  return (
    <div className="bg-[#2E3440] w-full max-w-screen-xl h-fit rounded-3xl p-6 md:p-8">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-center md:justify-between items-center">
          <h1 className="text-[1.5rem] sm:text-[2.5rem] font-semibold">
            {title}
          </h1>
          <div className="hidden md:flex flex-row gap-4">
            {repoLink && (
              <Link href={repoLink} target="_blank">
                <motion.div
                  whileHover={{ scale: 1.25 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaGithub className="size-8 fill-[#ECEFF4]" />
                </motion.div>
              </Link>
            )}
            {webLink && (
              <Link href={webLink} target="_blank">
                <motion.div
                  whileHover={{ scale: 1.25 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaLink className="size-8 fill-[#ECEFF4]" />
                </motion.div>
              </Link>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="relative aspect-[500/300] md:w-[40%]">
            <Image
              src={imageSrc}
              alt={imageAlt}
              layout="fill"
              className="object-cover rounded-md"
            />
          </div>
          <div className="flex flex-row gap-8 justify-center md:hidden">
            {repoLink && (
              <Link href={repoLink} target="_blank">
                <motion.div
                  whileHover={{ scale: 1.25 }}
                  whileTap={{ scale: 0.8 }}
                >
                  <FaGithub className="size-8 fill-[#ECEFF4]" />
                </motion.div>
              </Link>
            )}
            {webLink && (
              <Link href={webLink} target="_blank">
                <motion.div
                  whileHover={{ scale: 1.25 }}
                  whileTap={{ scale: 0.8 }}
                >
                  <FaLink className="size-8 fill-[#ECEFF4]" />
                </motion.div>
              </Link>
            )}
          </div>
          <div className="flex flex-col md:w-1/2 justify-between gap-4">
            <p className="text-[1rem] sm:text-[1.25rem]">{description}</p>
            <div className="flex flex-row justify-center flex-wrap gap-2">
              {tags &&
                tags.map((tag, index) => (
                  <motion.span
                    key={index}
                    whileHover={{ scale: 1.1, background: '#81A1C1' }}
                    className="bg-[#5D81AC] w-fit rounded-full px-4 py-1"
                  >
                    {tag}
                  </motion.span>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
