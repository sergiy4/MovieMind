import { type Entity } from '~/common/types/types.js';

import { MovieEntity } from '../movies/movie.entity.js';
import { type Movie } from '../movies/movies.js';
import { type MessageSender } from './types/types.js';

class MessageEntity implements Entity {
    private 'id': number | null;

    private 'sender': MessageSender;

    private 'content': string;

    private 'chatId': number;

    private 'movies': MovieEntity[];

    private constructor({
        id,
        sender,
        content,
        chatId,
        movies = [],
    }: {
        id: number | null;
        sender: MessageSender;
        content: string;
        chatId: number;
        movies: MovieEntity[];
    }) {
        this.id = id;
        this.sender = sender;
        this.content = content;
        this.chatId = chatId;
        this.movies = movies;
    }

    public static initialize({
        id,
        sender,
        content,
        chatId,
        movies,
    }: {
        id: number | null;
        sender: MessageSender;
        content: string;
        chatId: number;
        movies: MovieEntity[];
    }): MessageEntity {
        return new MessageEntity({
            id,
            sender,
            content,
            chatId,
            movies,
        });
    }

    public static initializeNew({
        sender,
        content,
        chatId,
        movies,
    }: {
        sender: MessageSender;
        content: string;
        chatId: number;
        movies: Movie[];
    }): MessageEntity {
        return new MessageEntity({
            id: null,
            sender,
            content,
            chatId,
            movies: movies.map((movie) => {
                return MovieEntity.initializeNew(movie);
            }),
        });
    }

    public toObject(): {
        id: number;
        sender: MessageSender;
        content: string;
        chatId: number;
        movies: Movie[];
    } {
        return {
            id: this.id as number,
            sender: this.sender,
            content: this.content,
            chatId: this.chatId,
            movies: this.movies.map((movie) => {
                return movie.toObject();
            }),
        };
    }

    public toNewObject(): {
        sender: MessageSender;
        content: string;
        chatId: number;
    } {
        return {
            content: this.content,
            sender: this.sender,
            chatId: this.chatId,
        };
    }
}

export { MessageEntity };
